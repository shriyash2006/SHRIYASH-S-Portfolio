export interface ChatMessage {
  role: 'system' | 'assistant' | 'user';
  content: string;
}

export interface ChatResponseChunk {
  content: string;
}

/**
 * Sends a chat request to the Google Gemini REST API and streams the response.
 * Maps our internal ChatMessage format to Gemini's `contents` + `systemInstruction` format.
 */
export async function* streamChat(messages: ChatMessage[]): AsyncGenerator<ChatResponseChunk> {
  const apiKey = process.env.GEMINI_API_KEY;
  // Allow overriding the model via env; default to gemini-2.0-flash-latest
  const model = process.env.GEMINI_MODEL ?? 'gemini-3.8-flash';

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }

  // Separate the system prompt from the conversation messages
  const systemMessages = messages.filter((m) => m.role === 'system');
  const conversationMessages = messages.filter((m) => m.role !== 'system');

  // Build Gemini `contents` array — only 'user' and 'model' roles are valid
  const contents = conversationMessages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  // Build optional systemInstruction from any system messages
  const systemInstruction =
    systemMessages.length > 0
      ? { parts: [{ text: systemMessages.map((m) => m.content).join('\n\n') }] }
      : undefined;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 500,
    },
  };

  if (systemInstruction) {
    body.systemInstruction = systemInstruction;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${text}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  if (!reader) {
    throw new Error('Failed to get response stream reader');
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE: each event is separated by double newline
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const data = line.replace(/^data:\s*/, '').trim();
      if (!data || data === '[DONE]') continue;

      try {
        const parsed = JSON.parse(data);
        // Gemini SSE response: candidates[0].content.parts[0].text
        const text: string | undefined =
          parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          yield { content: text };
        }
      } catch {
        // Ignore malformed SSE lines
      }
    }
  }
}
