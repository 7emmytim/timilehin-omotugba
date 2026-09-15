const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

/**
 * Loaded on demand rather than imported at the top of _app, so the analytics
 * bundle stays out of the first load. Nothing on the page needs it to paint.
 */
export async function initMixpanel() {
  if (!MIXPANEL_TOKEN) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Mixpanel token is missing. Check your .env file.");
    }
    return;
  }

  const { default: mixpanel } = await import("mixpanel-browser");

  mixpanel.init(MIXPANEL_TOKEN, {
    autocapture: true,
    track_pageview: true,
    // No session replay. Pageviews and autocapture answer everything worth
    // knowing about a one-page site, without recording visitors.
    record_sessions_percent: 0,
  });
}
