import Link from "next/link";
import { useEffect, useState } from "react";
import { Document, TransmitRight } from "@/icons";

const FILE = "/resume.pdf";

/**
 * Opens the resume inside the editor rather than throwing the visitor into a
 * raw browser tab.
 *
 * Uses the browser's own PDF viewer, so it costs nothing in bundle size. Most
 * mobile browsers refuse to render a PDF in an iframe and show a blank box
 * instead, so narrow screens get a real panel rather than a broken embed.
 */
export function ResumeViewer() {
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setCanEmbed(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (canEmbed === null) return <div className="h-full bg-editor" />;

  if (!canEmbed) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
        <Document className="h-10 w-10 text-accent" />
        <div>
          <p className="m-0 mb-1.5 text-[15px] font-semibold text-white">
            resume.pdf
          </p>
          <p className="m-0 max-w-[34ch] text-[13.5px] leading-[1.55] text-fg/70">
            Phone browsers can&apos;t show a PDF inside the page, so this one
            opens in your PDF viewer.
          </p>
        </div>
        <Link
          href={FILE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-accent bg-accent px-4 py-2.5 font-mono text-xs font-medium text-accent-fg"
        >
          Open résumé
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-editor">
      <div className="flex items-center gap-3 border-b border-hair px-4 py-2 font-mono text-[11.5px] text-mute">
        <Document className="h-[15px] w-[15px] flex-none text-accent" />
        <span className="truncate">resume.pdf</span>
        <Link
          href={FILE}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex flex-none items-center gap-1.5 hover:text-fg"
        >
          Open in new tab
          <TransmitRight className="h-3 w-3" />
        </Link>
        <Link
          href={FILE}
          download="Timilehin-Omotugba-Resume.pdf"
          className="flex-none hover:text-fg"
        >
          Download
        </Link>
      </div>

      <iframe
        src={`${FILE}#view=FitH`}
        title="Timilehin Omotugba, résumé"
        className="min-h-0 w-full flex-1 border-0 bg-[#1b1e27]"
      />
    </div>
  );
}
