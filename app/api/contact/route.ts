import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "shriyashsahu2006@gmail.com";

    // If Resend API key is provided, transmit email
    if (apiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [recipientEmail],
          reply_to: validatedData.email,
          subject: `[Portfolio Inquiry] ${validatedData.subject} - from ${validatedData.name}`,
          text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nSubject: ${validatedData.subject}\n\nMessage:\n${validatedData.message}`,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        // eslint-disable-next-line no-console
        console.error("Resend API error:", errorText);
      }
    } else {
      // In development or when Resend key is not yet configured, log for local verification
      // eslint-disable-next-line no-console
      console.log("[Contact Submission Received]", {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        messageLength: validatedData.message.length,
        timestamp: new Date().toISOString(),
      });
    }

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

    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
