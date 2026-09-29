"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Signature } from "@/components/ui/signature";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        trackEvent({ name: "contact_submit", success: true });
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Failed to transmit message. Please try directly via email.");
        trackEvent({ name: "contact_submit", success: false });
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please contact directly via shriyashsahu2006@gmail.com.");
      trackEvent({ name: "contact_submit", success: false });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-border bg-card">
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <SectionHeading
          number="08"
          label="CONTACT"
          title="Have a project in mind?"
          subtitle="Let's build something useful, thoughtful and technically strong."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4">
          {/* Left Column: Direct Links & Brand Guarantee */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Whether you want to discuss full-stack engineering, hackathon collaboration, research, or an open-source initiative, feel free to reach out.
              </p>

              {/* Direct Communication Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={`mailto:${siteConfig.email}?subject=Project%20Inquiry%20from%20Portfolio`}
                  className="px-5 py-3.5 border border-border hover:border-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-200 flex items-center justify-between text-xs sm:text-sm font-mono uppercase tracking-wider group"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Me Directly</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 border border-border hover:border-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-200 flex items-center justify-between text-xs sm:text-sm font-mono uppercase tracking-wider group"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 border border-border hover:border-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-200 flex items-center justify-between text-xs sm:text-sm font-mono uppercase tracking-wider group"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Repositories</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Subtle Signature & Response Guarantee */}
            <div className="pt-8 border-t border-border space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
                  COMMUNICATION COMMITMENT
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Inquiries receive responses typically within 24–48 hours.
                </p>
              </div>
              <Signature width={160} height={50} />
            </div>
          </div>

          {/* Right Column: Architectural Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-border p-6 sm:p-8 bg-background">
              <div className="pb-4 mb-6 border-b border-border flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                  TRANSMISSION CONSOLE
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  STATUS: {status.toUpperCase()}
                </span>
              </div>

              {status === "success" ? (
                <div className="py-12 px-4 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto border border-foreground flex items-center justify-center bg-foreground text-background">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium tracking-tight text-foreground">
                    Message Dispatched Successfully
                  </h4>
                  <p className="text-sm text-muted-foreground font-mono max-w-sm mx-auto">
                    Thank you for reaching out. I have received your dispatch and will reply shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 text-xs font-mono uppercase tracking-wider border border-border hover:border-foreground"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {status === "error" && (
                    <div className="p-4 border border-foreground/40 bg-foreground/[0.04] text-xs font-mono flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block font-mono text-xs uppercase tracking-wider text-foreground"
                      >
                        Name <span className="text-muted-foreground">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        placeholder="Your full name"
                        disabled={isSubmitting}
                        className={cn(
                          "w-full px-4 py-3 text-sm bg-muted/30 border text-foreground focus:outline-none transition-colors",
                          errors.name
                            ? "border-foreground focus:ring-1 focus:ring-foreground"
                            : "border-border focus:border-foreground"
                        )}
                      />
                      {errors.name && (
                        <p className="font-mono text-[11px] text-foreground">
                          * {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block font-mono text-xs uppercase tracking-wider text-foreground"
                      >
                        Email Address <span className="text-muted-foreground">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="shriyash@example.com"
                        disabled={isSubmitting}
                        className={cn(
                          "w-full px-4 py-3 text-sm bg-muted/30 border text-foreground focus:outline-none transition-colors",
                          errors.email
                            ? "border-foreground focus:ring-1 focus:ring-foreground"
                            : "border-border focus:border-foreground"
                        )}
                      />
                      {errors.email && (
                        <p className="font-mono text-[11px] text-foreground">
                          * {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="block font-mono text-xs uppercase tracking-wider text-foreground"
                    >
                      Subject <span className="text-muted-foreground">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      {...register("subject")}
                      placeholder="Project discussion, collaboration, or question"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full px-4 py-3 text-sm bg-muted/30 border text-foreground focus:outline-none transition-colors",
                        errors.subject
                          ? "border-foreground focus:ring-1 focus:ring-foreground"
                          : "border-border focus:border-foreground"
                      )}
                    />
                    {errors.subject && (
                      <p className="font-mono text-[11px] text-foreground">
                        * {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block font-mono text-xs uppercase tracking-wider text-foreground"
                    >
                      Message <span className="text-muted-foreground">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      placeholder="Outline your thoughts, requirements, or opportunities..."
                      disabled={isSubmitting}
                      className={cn(
                        "w-full px-4 py-3 text-sm bg-muted/30 border text-foreground focus:outline-none transition-colors resize-y",
                        errors.message
                          ? "border-foreground focus:ring-1 focus:ring-foreground"
                          : "border-border focus:border-foreground"
                      )}
                    />
                    {errors.message && (
                      <p className="font-mono text-[11px] text-foreground">
                        * {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest font-semibold border border-foreground hover:bg-background hover:text-foreground transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
