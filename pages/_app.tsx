import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { MetaTags } from "@/layout";
import { initMixpanel } from "@/lib";
import { ModeProvider } from "@/context";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Wait for an idle moment so analytics never competes with first paint.
    const start = () => void initMixpanel();

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(start, 2000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <ModeProvider>
      <MetaTags />
      <Component {...pageProps} />
    </ModeProvider>
  );
}
