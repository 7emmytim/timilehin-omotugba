import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MetaTags } from "@/layout";
import { initMixpanel } from "@/lib";
import { ModeProvider } from "@/context";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    initMixpanel();
  }, [router.events]);

  return (
    <ModeProvider>
      <MetaTags />
      <Component {...pageProps} />
    </ModeProvider>
  );
}
