import Head from "next/head";
import { yearsInWords } from "@/lib";

/**
 * The page says "Frontend Engineer" so it doesn't box the role in. The
 * search-facing text names the stack, so searches for React, Next.js or
 * TypeScript engineers can still find the page.
 */
const TITLE = "Timilehin Omotugba | Frontend Engineer, React & TypeScript";
const STACK = ["React", "Next.js", "TypeScript", "Tailwind CSS"];

export function MetaTags() {
  const shareDescription = `Frontend engineer in Abuja, Nigeria. ${yearsInWords({ capitalize: true })} years building websites and apps with React, Next.js and TypeScript for trading, healthcare and research teams. Turn on dev mode to read the site as source.`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{TITLE}</title>

      {/* Google Site Verification */}
      <meta
        name="google-site-verification"
        content="BhuT7hhwmAmBNPhB6QyJ2GPWCuGYPFgfdCaZDyHJ_So"
      />
      <meta name="title" content={TITLE} />
      <meta
        name="description"
        content={`Frontend engineer in Abuja, Nigeria, building with React, Next.js and TypeScript. ${yearsInWords({ capitalize: true })} years shipping production apps for trading, healthcare and research teams.`}
      />
      {/* The spellings people actually type, not just the official names. */}
      <meta
        name="keywords"
        content="Timilehin Omotugba, Frontend Engineer, React Engineer, React Developer, ReactJS, Next.js Developer, NextJS, TypeScript Developer, React, Next.js, TypeScript, Tailwind CSS, SaaS, Frontend Developer, Software Engineer, Abuja, Nigeria, Portfolio"
      />
      <meta name="author" content="Timilehin Omotugba" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://timilehinomotugba.com" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://timilehinomotugba.com" />
      <meta
        property="og:title"
        content={TITLE}
      />
      <meta
        property="og:description"
        content={shareDescription}
      />
      <meta
        property="og:image"
        content="https://timilehinomotugba.com/og-image.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Timilehin Omotugba, Frontend Engineer"
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://timilehinomotugba.com"
      />
      <meta
        property="twitter:title"
        content={TITLE}
      />
      <meta
        property="twitter:description"
        content={shareDescription}
      />
      <meta
        property="twitter:image"
        content="https://timilehinomotugba.com/og-image.png"
      />

      {/* Favicon. The ?v= is deliberate: browsers cache favicons hard and
          will keep showing a stale one for a long time otherwise. Bump it
          whenever the icon changes. */}
      <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png?v=3"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png?v=3"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png?v=3"
      />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Timilehin Omotugba",
            url: "https://timilehinomotugba.com",
            image: "https://timilehinomotugba.com/avatar.png",
            jobTitle: "Frontend Engineer",
            knowsAbout: STACK,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Abuja",
              addressCountry: "NG",
            },
            description:
              "Frontend engineer building clean, responsive, performant web applications with React, Next.js and TypeScript.",
            sameAs: [
              "https://github.com/7emmytim",
              "https://www.linkedin.com/in/timilehin-omotugba",
              "https://x.com/7emmytim",
            ],
            // worksFor: {
            //   "@type": "Organization",
            //   name: "AFEX",
            //   url: "https://company-website.com",
            // },
          }),
        }}
      />

      {/* Structured data for the website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Timilehin Omotugba Portfolio",
            url: "https://timilehinomotugba.com",
          }),
        }}
      />
    </Head>
  );
}
