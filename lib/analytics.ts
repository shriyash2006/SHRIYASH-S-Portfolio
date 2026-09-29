export type AnalyticsEvent =
  | { name: "page_view"; path: string }
  | { name: "project_open"; slug: string }
  | { name: "resume_click"; format: "pdf" | "png" }
  | { name: "contact_submit"; success: boolean }
  | { name: "design_import_open" }
  | { name: "theme_toggle"; theme: string };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  // Development debug log
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("[Analytics Event]", event);
  }

  // Hook for Plausible, Google Analytics, or custom telemetry if window.gtag exists
  if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", event.name, event);
  }
}
