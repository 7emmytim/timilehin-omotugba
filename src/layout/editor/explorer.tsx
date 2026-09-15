import { useMode, useNav } from "@/context";
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
}: {
  id: string;
  label: string;
  icon: string;
  ink: string;
  meta?: string;
  nested?: boolean;
}) {
  const { active, goTo, openFile } = useNav();
  const on = id === active && openFile === "doc";

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

/** A static row: not navigation, just texture. */
function StaticRow({
  label,
  icon,
  ink,
  meta,
  nested,
}: {
  label: string;
  icon: string;
  ink: string;
  meta?: string;
  nested?: boolean;
}) {
  return (
    <div className={`${ROW} ${nested ? "pl-8" : "pl-4"}`}>
      <span className={`w-4 flex-none text-center text-[11px] ${ink}`}>
        {icon}
      </span>
      {label}
      {meta && <span className="ml-auto text-[10.5px] text-mute">{meta}</span>}
    </div>
  );
}

export function Explorer() {
  const { mode } = useMode();
  const { items, openFile, openResume } = useNav();

  const counts: Record<string, string> = {
    experience: `${experiences.length} roles`,
    work: `${projects.length}`,
    "file-experience": `${experiences.length}`,
    "file-projects": `${projects.length}`,
  };

  return (
    <aside className="hidden overflow-y-auto border-r border-hair bg-side py-2.5 text-fg editor-scroll lg:block">
      <Heading>
        {mode === "dev" ? "Explorer: portfolio" : "Timilehin Omotugba"}
      </Heading>

      {mode === "dev" && (
        <StaticRow label="src" icon="▾" ink="text-[#c09553]" />
      )}

      {items.map((item) => (
        <NavRow
          key={item.id}
          {...item}
          meta={counts[item.id]}
          nested={mode === "dev"}
        />
      ))}

      {mode === "dev" && (
        <StaticRow label="contact.ts" icon="TS" ink="text-s-blue" nested />
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
        {mode === "dev" ? "resume.pdf" : "Résumé (PDF)"}
      </button>

      <div className="pt-4">
        <Heading>{mode === "dev" ? "Outline" : "Where I've worked"}</Heading>
        {mode === "dev" ? (
          <>
            <StaticRow label="Developer" icon="◈" ink="text-s-blue" />
            <StaticRow label="experience[]" icon="ƒ" ink="text-s-fn" />
            <StaticRow label="projects[]" icon="ƒ" ink="text-s-fn" />
          </>
        ) : (
          experiences.map(({ company, duration }) => (
            <StaticRow
              key={company}
              label={company}
              icon="●"
              ink="text-accent"
              meta={duration.split(" - ")[0]}
            />
          ))
        )}
      </div>
    </aside>
  );
}
