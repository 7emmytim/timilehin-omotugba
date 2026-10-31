import { useState } from "react";
import { useNav } from "@/context";
import experiences from "@/data/experiences.json";
import projects from "@/data/projects.json";

const ROW =
  "flex w-full items-center gap-2 py-[5px] pr-[18px] text-left text-[12.5px] whitespace-nowrap";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-[18px] pt-1 pb-2.5 text-[10.5px] tracking-[0.1em] text-mute uppercase">
      {children}
    </div>
  );
}

/** A row that scrolls the pane to a section. */
function NavRow({
  id,
  label,
  icon,
  ink,
  meta,
  nested,
  marksActive = true,
}: {
  id: string;
  label: string;
  icon: string;
  ink: string;
  meta?: string;
  nested?: boolean;
  /** Off for outline rows, so the file row alone shows where you are. */
  marksActive?: boolean;
}) {
  const { active, goTo, openFile } = useNav();
  const on = marksActive && id === active && openFile === "doc";

  return (
    <button
      type="button"
      onClick={() => goTo(id)}
      aria-current={on ? "true" : undefined}
      className={`${ROW} cursor-pointer ${nested ? "pl-8" : "pl-4"} ${
        on ? "bg-sel text-white" : "hover:bg-hover"
      }`}
    >
      <span className={`w-4 flex-none text-center text-[11px] ${ink}`}>
        {icon}
      </span>
      {label}
      {meta && <span className="ml-auto text-[10.5px] text-mute">{meta}</span>}
    </button>
  );
}

export function Explorer() {
  const { items, openFile, openResume, showContact } = useNav();
  const [srcOpen, setSrcOpen] = useState(true);

  const counts: Record<string, string> = {
    "file-experience": `${experiences.length}`,
    "file-projects": `${projects.length}`,
  };

  return (
    <aside className="hidden overflow-y-auto border-r border-hair bg-side py-2.5 text-fg editor-scroll lg:block">
      <Heading>Explorer: portfolio</Heading>

      <button
        type="button"
        onClick={() => setSrcOpen((open) => !open)}
        aria-expanded={srcOpen}
        aria-controls="explorer-src"
        className={`${ROW} cursor-pointer pl-4 hover:bg-hover`}
      >
        <span className="w-4 flex-none text-center text-[11px] text-[#c09553]">
          {srcOpen ? "▾" : "▸"}
        </span>
        src
      </button>

      {srcOpen && (
        <div id="explorer-src">
          {items.map((item) => (
            <NavRow key={item.id} {...item} meta={counts[item.id]} nested />
          ))}

          {/* Not a real file: the contact details are the terminal output,
              so this opens the terminal and lands on them. */}
          <button
            type="button"
            onClick={showContact}
            title="Show contact details in the terminal"
            className={`${ROW} cursor-pointer pl-8 hover:bg-hover`}
          >
            <span className="w-4 flex-none text-center text-[11px] text-s-blue">
              TS
            </span>
            contact.ts
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={openResume}
        aria-current={openFile === "resume" ? "true" : undefined}
        className={`${ROW} cursor-pointer pl-4 ${
          openFile === "resume" ? "bg-sel text-white" : "hover:bg-hover"
        }`}
      >
        <span className="w-4 flex-none text-center text-[11px] text-[#e06c75]">
          ▤
        </span>
        resume.pdf
      </button>

      <div className="pt-4">
        <Heading>Outline</Heading>
        {/* Symbols jump to the same places as their files. */}
        <NavRow
          id="file-timilehin"
          label="Developer"
          icon="◈"
          ink="text-s-blue"
          marksActive={false}
        />
        <NavRow
          id="file-experience"
          label="experience[]"
          icon="ƒ"
          ink="text-s-fn"
          marksActive={false}
        />
        <NavRow
          id="file-projects"
          label="projects[]"
          icon="ƒ"
          ink="text-s-fn"
          marksActive={false}
        />
      </div>
    </aside>
  );
}
