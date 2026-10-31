import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    // ModeProvider keeps data-mode in sync after mount; reader is the default.
    <Html lang="en" data-mode="reader">
      <Head>
        {/* Runs before first paint, so a visitor who left in dev mode gets the
            dark page straight away instead of a flash of the plain page. Same
            rules as ModeProvider: ?view= wins, then the saved choice. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var v=new URLSearchParams(location.search).get("view");document.documentElement.dataset.mode=v==="code"?"dev":v==="simple"?"reader":localStorage.getItem("portfolio-mode")==="dev"?"dev":"reader"}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
