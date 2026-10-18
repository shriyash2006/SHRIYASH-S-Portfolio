import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters.")
    .max(200, "Subject must be 200 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be 5,000 characters or fewer."),
});

const htmlEscapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => htmlEscapes[character]);
}

export async function POST(req: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const validatedData = contactSchema.parse(body);

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const recipientEmail = process.env.CONTACT_EMAIL?.trim();
    const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";

    if (!resendApiKey || !recipientEmail) {
      // eslint-disable-next-line no-console
      console.error("[Contact Error] Resend environment is incomplete");
      return NextResponse.json(
        { success: false, message: "Email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [recipientEmail],
      replyTo: validatedData.email,
      subject: `[Portfolio Inquiry] ${validatedData.subject} - from ${validatedData.name}`,
      text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nSubject: ${validatedData.subject}\n\nMessage:\n${validatedData.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">New Portfolio Contact Message</h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${escapeHtml(validatedData.name)}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(validatedData.email)}">${escapeHtml(validatedData.email)}</a></p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${escapeHtml(validatedData.subject)}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #000; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(validatedData.message)}</p>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
            <p>This message was sent from your portfolio contact form at ${new Date().toISOString()}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("[Resend Error]", error);
      return NextResponse.json(
        { success: false, message: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    // eslint-disable-next-line no-console
    console.log("[Contact Email Sent]", {
      id: data?.id,
      to: recipientEmail,
      from: validatedData.email,
      subject: validatedData.subject,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received. Thank you for reaching out.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // eslint-disable-next-line no-console
    console.error("[Contact API Error]", error instanceof Error ? error.message : error);

    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
