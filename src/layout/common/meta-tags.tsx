import Head from "next/head";
import { yearsInWords } from "@/lib";

export function MetaTags() {
  const years = yearsInWords();
  const shareDescription = `Frontend developer in Abuja, Nigeria. ${yearsInWords({ capitalize: true })} years building websites and apps for trading, healthcare and research teams. Turn on dev mode to read the site as source.`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>Timilehin Omotugba | Frontend Developer</title>

      {/* Google Site Verification */}
      <meta
        name="google-site-verification"
        content="BhuT7hhwmAmBNPhB6QyJ2GPWCuGYPFgfdCaZDyHJ_So"
      />
      <meta name="title" content="Timilehin Omotugba | Frontend Developer" />
      <meta
        name="description"
        content={`Frontend developer with ${years} years shipping production React. I build responsive, performant interfaces with Next.js, TypeScript and Tailwind CSS.`}
      />
      <meta
        name="keywords"
        content="Timilehin Omotugba, Frontend Developer, React, Next.js, TypeScript, Tailwind CSS, Abuja, Nigeria, Portfolio"
      />
      <meta name="author" content="Timilehin Omotugba" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.timilehinomotugba.com" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.timilehinomotugba.com" />
      <meta
        property="og:title"
        content="Timilehin Omotugba | Frontend Developer"
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
        content="Timilehin Omotugba, Frontend Developer"
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://www.timilehinomotugba.com"
      />
      <meta
        property="twitter:title"
        content="Timilehin Omotugba | Frontend Developer"
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
            jobTitle: "Frontend Developer",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Abuja",
              addressCountry: "NG",
            },
            description:
              "Frontend developer building clean, responsive, performant web applications with React and Next.js.",
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
