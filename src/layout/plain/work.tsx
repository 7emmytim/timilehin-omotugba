import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import projects from "@/data/projects.json";
import { Accent, SectionTitle, WRAP } from "./shared";

type Project = (typeof projects)[number];

/**
 * The screenshot in a white frame. It links to the same site as "Visit site",
 * so it's hidden from keyboard and screen readers to avoid a duplicate link.
 */
function Shot({
  name,
  image,
  url,
  flip,
}: Pick<Project, "name" | "image" | "url"> & { flip: boolean }) {
  const [broken, setBroken] = useState(false);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className={`block rounded-[14px] border border-rule bg-paper-raised p-1.5 shadow-[0_1px_2px_rgba(20,21,26,0.04),0_12px_32px_-12px_rgba(20,21,26,0.12)] transition duration-400 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(20,21,26,0.04),0_24px_48px_-16px_rgba(20,21,26,0.2)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 min-[860px]:rounded-[18px] min-[860px]:p-2.5 ${
        flip ? "min-[860px]:order-2" : ""
      }`}
    >
      <span className="hidden gap-1.5 px-1.5 pt-1 pb-2.5 min-[860px]:flex">
        <i className="block h-[9px] w-[9px] rounded-full bg-rule" />
        <i className="block h-[9px] w-[9px] rounded-full bg-rule" />
        <i className="block h-[9px] w-[9px] rounded-full bg-rule" />
      </span>
      {/* Phones get a taller crop so the product's own headline is readable,
          anchored left so the crop cuts the edge, not the words. */}
      <span className="relative block aspect-[4/3] overflow-hidden rounded-[9px] bg-paper-sunk min-[860px]:aspect-[16/10] min-[860px]:rounded-[10px]">
        {broken ? (
          <span className="grid h-full place-items-center px-4 text-center text-sm font-semibold text-ink-60">
            {name}
          </span>
        ) : (
          <Image
            src={`/images/${image}.png`}
            alt=""
            fill
            sizes="(max-width: 860px) 100vw, 60vw"
            onError={() => setBroken(true)}
            className="object-cover object-left-top min-[860px]:object-top"
          />
        )}
      </span>
    </Link>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { name, image, url, tags, description, role } = project;

  return (
    <li className="grid gap-[18px] border-t border-rule py-7 min-[860px]:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] min-[860px]:items-center min-[860px]:gap-[clamp(28px,5vw,64px)] min-[860px]:py-[clamp(28px,4vw,44px)]">
      <Shot name={name} image={image} url={url} flip={index % 2 === 1} />

      <div>
        <span className="font-mono text-[13px] text-ink-60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="m-0 mt-1.5 text-2xl font-semibold tracking-[-0.03em] text-ink min-[860px]:mt-2.5 min-[860px]:text-[clamp(26px,2.8vw,34px)]">
          {name}
        </h3>

        {tags.length > 0 && (
          <ul role="list" className="m-0 my-3 flex list-none flex-wrap gap-2 p-0 min-[860px]:mt-3.5 min-[860px]:mb-4">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-rule bg-paper-raised px-2.5 py-1 text-[12.5px] text-ink-75"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {description && (
          <p className="m-0 mb-2.5 max-w-[44ch] text-[15.5px] leading-[1.6] text-ink-75 min-[860px]:mb-3.5 min-[860px]:text-[16.5px]">
            {description}
          </p>
        )}
        {role && (
          <p className="m-0 text-[14.5px] leading-[1.55] text-ink-60">
            <b className="font-semibold text-ink">What I did:</b> {role}
          </p>
        )}

        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3.5 inline-flex items-center gap-2 border-b border-leaf-line pb-[3px] text-[15px] font-semibold text-leaf transition-colors hover:border-leaf min-[860px]:mt-[22px]"
        >
          Visit site ↗<span className="sr-only"> ({name}, opens in a new tab)</span>
        </Link>
      </div>
    </li>
  );
}

export function Work() {
  return (
    <section id="work" className="pt-16 min-[860px]:pt-[clamp(72px,10vw,128px)]">
      <div className={WRAP}>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 min-[860px]:mb-[clamp(36px,5vw,56px)]">
          <SectionTitle kicker="Selected work">
            Products people <Accent>use</Accent> every day
          </SectionTitle>
          <p className="m-0 max-w-[40ch] text-[15px] leading-[1.6] text-ink-60 min-[860px]:text-base">
            Each one is live. Click a screenshot to visit the real site.
          </p>
        </div>

        <ol role="list" className="m-0 list-none p-0">
          {projects.map((project, index) => (
            <ProjectRow key={project.name} project={project} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
