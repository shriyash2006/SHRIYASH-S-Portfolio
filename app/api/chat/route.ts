import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { streamChat, type ChatMessage } from '@/lib/ai-provider';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// In-memory rate limiter: max 15 requests per 10 minutes per IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// Simple abuse guard: total content (sum of message lengths) must be <= 3000 chars
const MAX_TOTAL_CONTENT = 3000;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  // Fallback to remote address (not always reliable in Vercel)
  return req.ip ?? 'unknown';
}

function enforceRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    const oldest = Math.min(...recent);
    const retryAfter = Math.ceil((RATE_WINDOW_MS - (now - oldest)) / 1000);
    rateLimitMap.set(ip, recent);
    return { allowed: false, retryAfter };
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return { allowed: true };
}

function validatePayload(payload: any): { valid: boolean; error?: string; messages?: ChatMessage[] } {
  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.messages)) {
    return { valid: false, error: 'Invalid payload: expected { messages: [...] }' };
  }
  const rawMessages = payload.messages;
  if (rawMessages.length === 0) {
    return { valid: false, error: 'Message array must not be empty.' };
  }
  const messages: ChatMessage[] = [];
  let totalLength = 0;
  for (const msg of rawMessages) {
    if (!msg || typeof msg !== 'object') {
      return { valid: false, error: 'Each message must be an object.' };
    }
    const { role, content } = msg;
    if (role !== 'user' && role !== 'assistant') {
      return { valid: false, error: "Invalid role: only 'user' or 'assistant' allowed." };
    }
    if (typeof content !== 'string') {
      return { valid: false, error: 'Message content must be a string.' };
    }
    if (content.length > 500) {
      return { valid: false, error: 'Message content exceeds 500 characters limit.' };
    }
    totalLength += content.length;
    messages.push({ role, content });
  }
  if (totalLength > MAX_TOTAL_CONTENT) {
    return { valid: false, error: `Total content length exceeds ${MAX_TOTAL_CONTENT} characters.` };
  }
  // Keep only the last 10 messages
  const trimmed = messages.slice(-10);
  return { valid: true, messages: trimmed };
}

// Build system prompt using knowledge file
function buildSystemPrompt(): string {
  const knowledgePath = path.join(process.cwd(), 'data', 'about-me.md');
  try {
    const raw = fs.readFileSync(knowledgePath, 'utf-8');
    // The system prompt must embed the knowledge but not reveal raw content directly to client.
    // We'll include it as a system message.
    return `You are the AI assistant on Shriyash Sahu's portfolio website. Speak about him in the third person or as "I'm his assistant". Use ONLY the information provided below to answer queries. If the answer is not present, respond that you don't have that info and direct the visitor to the contact page or email. Never fabricate projects, dates, employers, grades, or links. Be concise (2‑5 sentences). Friendly and professional.\n\n${raw}`;
  } catch (e) {
    // If reading fails, fallback to a generic system prompt.
    return "You are the AI assistant on Shriyash Sahu's portfolio website. Use only known information about him. If you don't know, decline politely.";
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = enforceRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Rate limit exceeded. Try again in ${rate.retryAfter} seconds.` },
      { status: 429 }
    );
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const validation = validatePayload(payload);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const clientMessages = validation.messages!;

  const systemPrompt = buildSystemPrompt();
  const messages: ChatMessage[] = [{ role: 'system', content: systemPrompt }, ...clientMessages];

  // Abort after ~30s
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const iterator = streamChat(messages);
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    // Consume async generator and forward text chunks
    (async () => {
      try {
        for await (const chunk of iterator) {
          const text = chunk.content;
          await writer.write(encoder.encode(text));
        }
        await writer.close();
      } catch (err) {
        // Forward error as JSON (client can handle)
        const errorMsg = typeof err === 'object' && err !== null && 'message' in err ? (err as any).message : String(err);
        await writer.write(encoder.encode(`\n[ERROR] ${errorMsg}`));
        await writer.close();
      } finally {
        clearTimeout(timeout);
      }
    })();

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        // No caching for streaming response
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    // Log server‑side only
    console.error('Chat API error:', error);
    clearTimeout(timeout);
    return NextResponse.json(
      { error: 'The assistant is unavailable right now. Please use the contact page.' },
      { status: 502 }
    );
  }
}
