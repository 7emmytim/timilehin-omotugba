import Link from "next/link";
import { useId, useRef, useState, type MouseEvent, type ReactNode } from "react";

const FILE = "/resume.pdf";

/**
 * "View résumé". On wide screens it opens the PDF in a dialog over the page,
 * using the browser's own viewer. Phones can't show a PDF in an iframe, so
 * there it stays a plain link that opens the PDF, which is also what happens
 * without JavaScript.
 *
 * A native <dialog> with showModal() handles Esc, the backdrop, keeping focus
 * inside, and returning focus to the button afterwards.
 */
export function ResumeButton({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  // The iframe only mounts while open, so the PDF isn't fetched on page load.
  const [open, setOpen] = useState(false);

  const show = (event: MouseEvent) => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    event.preventDefault();
    setOpen(true);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  return (
    <>
      <Link
        href={FILE}
        target="_blank"
        rel="noopener noreferrer"
        onClick={show}
        className={className}
      >
        {children}
      </Link>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        // A click on the backdrop lands on the dialog itself, not its content.
        onClick={(event) => event.target === event.currentTarget && close()}
        className="m-auto h-[min(90dvh,1000px)] max-h-none w-[min(92vw,900px)] max-w-none overflow-hidden rounded-2xl border border-rule bg-paper-raised p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-4 border-b border-rule px-5 py-3">
            <h2 id={titleId} className="m-0 text-[15px] font-semibold">
              Résumé
            </h2>
            <Link
              href={FILE}
              download="Timilehin-Omotugba-Resume.pdf"
              className="ml-auto text-sm font-semibold text-leaf hover:underline"
            >
              Download
            </Link>
            <Link
              href={FILE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-60 hover:text-ink"
            >
              Open in new tab ↗
            </Link>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="cursor-pointer rounded-full border border-rule px-3.5 py-1.5 text-sm font-medium hover:border-ink-60"
            >
              Close
            </button>
          </div>

          {open && (
            <iframe
              src={`${FILE}#view=FitH`}
              title="Timilehin Omotugba, résumé"
              className="min-h-0 w-full flex-1 border-0 bg-paper-sunk"
            />
          )}
        </div>
      </dialog>
    </>
  );
}
