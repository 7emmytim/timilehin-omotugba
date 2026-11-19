import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import data from "@/data/projects.json";
import { Accent, SectionTitle, WRAP } from "./shared";

type Project = {
  name: string;
  company: string;
  image: string;
  url: string;
  tags: string[];
  description: string;
  role: string;
  inset?: string;
  video?: string;
  links?: { label: string; url: string }[];
};

const projects: Project[] = data;
const FEATURED = 2;
const featured = projects.slice(0, FEATURED);
const more = projects.slice(FEATURED);

/**
 * Loops muted, and only while it's on screen. Anyone who asked for less motion
 * gets the still image underneath until they press play.
 */
function LoopVideo({
  name,
  video,
  crop,
}: {
  name: string;
  video: string;
  crop: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [paused, setPaused] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    userPaused.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) el.pause();
        else if (!userPaused.current) el.play().catch(() => {});
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  }

  return (
    <>
      <video
        ref={ref}
        src={`/videos/${video}.mp4`}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onPlaying={() => setStarted(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${crop} ${
          started ? "opacity-100" : "opacity-0"
        }`}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${paused ? "Play" : "Pause"} the ${name} preview`}
        className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-2.5 py-1 text-[12px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-ink"
      >
        <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
        {paused ? "Play" : "Pause"}
      </button>
    </>
  );
}

/**
 * The screenshot (or recording) in a white frame. The link over it goes to the
 * same site as "Visit site", so it's hidden from keyboard and screen readers to
 * avoid a duplicate link.
 */
function Shot({
  project,
  size,
  flip = false,
}: {
  project: Project;
  size: "row" | "card";
  flip?: boolean;
}) {
  const { name, image, inset, video, url } = project;
  const [broken, setBroken] = useState(false);
  const row = size === "row";
  const crop = row ? "object-left-top min-[860px]:object-top" : "object-top";

  return (
    <div
      className={`rounded-[14px] border border-rule bg-paper-raised p-1.5 shadow-[0_1px_2px_rgba(20,21,26,0.04),0_12px_32px_-12px_rgba(20,21,26,0.12)] transition duration-400 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(20,21,26,0.04),0_24px_48px_-16px_rgba(20,21,26,0.2)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        row ? "min-[860px]:rounded-[18px] min-[860px]:p-2.5" : ""
      } ${flip ? "min-[860px]:order-2" : ""}`}
    >
      {row && (
        <span className="hidden gap-1.5 px-1.5 pt-1 pb-2.5 min-[860px]:flex">
          <i className="block h-[9px] w-[9px] rounded-full bg-rule" />
          <i className="block h-[9px] w-[9px] rounded-full bg-rule" />
          <i className="block h-[9px] w-[9px] rounded-full bg-rule" />
        </span>
      )}
      {/* Phones get a taller crop so the product's own headline is readable,
          anchored left so the crop cuts the edge, not the words. */}
      <span
        className={`relative block overflow-hidden rounded-[9px] bg-paper-sunk ${
          row
            ? "aspect-[4/3] min-[860px]:aspect-[16/10] min-[860px]:rounded-[10px]"
            : "aspect-video"
        }`}
      >
        {broken ? (
          <span className="grid h-full place-items-center px-4 text-center text-sm font-semibold text-ink-60">
            {name}
          </span>
        ) : (
          <Image
            src={`/images/${image}.png`}
            alt=""
            fill
            sizes={
              row
                ? "(max-width: 860px) 100vw, 60vw"
                : "(max-width: 860px) 100vw, 380px"
            }
            onError={() => setBroken(true)}
            className={`object-cover ${crop}`}
          />
        )}
        {inset && (
          <span className="absolute right-3 bottom-3 aspect-[16/10] w-[44%] overflow-hidden rounded-lg border-[3px] border-paper-raised shadow-[0_10px_28px_-8px_rgba(20,21,26,0.35)]">
            <Image
              src={`/images/${inset}.png`}
              alt=""
              fill
              sizes="(max-width: 860px) 45vw, 170px"
              className="object-cover object-left-top"
            />
          </span>
        )}
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0"
        />
        {video && <LoopVideo name={name} video={video} crop={crop} />}
      </span>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul role="list" className="m-0 flex list-none flex-wrap gap-2 p-0">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-rule bg-paper-raised px-2.5 py-1 text-[12.5px] text-ink-75"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Visit({
  name,
  url,
  label = "Visit site",
  className = "",
}: {
  name: string;
  url: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 border-b border-leaf-line pb-[3px] font-semibold text-leaf transition-colors hover:border-leaf ${className}`}
    >
      {label} ↗<span className="sr-only"> ({name}, opens in a new tab)</span>
    </Link>
  );
}

function Links({ project }: { project: Project }) {
  const { name, url, links = [] } = project;
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      <Visit name={name} url={url} className="text-[15px]" />
      {links.map((link) => (
        <Visit
          key={link.url}
          name={name}
          url={link.url}
          label={link.label}
          className="text-[15px]"
        />
      ))}
    </div>
  );
}

function number(index: number) {
  return String(index + 1).padStart(2, "0");
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { name, tags, description, role } = project;

  return (
    <li className="grid gap-[18px] border-t border-rule py-7 min-[860px]:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] min-[860px]:items-center min-[860px]:gap-[clamp(28px,5vw,64px)] min-[860px]:py-[clamp(28px,4vw,44px)]">
      <Shot project={project} size="row" flip={index % 2 === 1} />

      <div>
        <span className="font-mono text-[13px] text-ink-60">
          {number(index)}
        </span>
        <h3 className="m-0 mt-1.5 text-2xl font-semibold tracking-[-0.03em] text-ink min-[860px]:mt-2.5 min-[860px]:text-[clamp(26px,2.8vw,34px)]">
          {name}
        </h3>

        <div className="my-3 min-[860px]:mt-3.5 min-[860px]:mb-4">
          <Tags tags={tags} />
        </div>

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

        <div className="mt-3.5 min-[860px]:mt-[22px]">
          <Links project={project} />
        </div>
      </div>
    </li>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { name, tags, description } = project;

  return (
    <li className="flex flex-col">
      <Shot project={project} size="card" />
      <h4 className="m-0 mt-4 text-xl font-semibold tracking-[-0.02em] text-ink">
        {name}
      </h4>
      {description && (
        <p className="m-0 mt-1.5 text-[15px] leading-[1.55] text-ink-75">
          {description}
        </p>
      )}
      <div className="mt-2.5">
        <Tags tags={tags} />
      </div>
      <div className="mt-3">
        <Links project={project} />
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
          {featured.map((project, index) => (
            <ProjectRow key={project.name} project={project} index={index} />
          ))}
        </ol>

        {more.length > 0 && (
          <div className="border-t border-rule pt-7 min-[860px]:pt-[clamp(28px,4vw,44px)]">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h3 className="m-0 text-xl font-semibold tracking-[-0.02em] text-ink">
                More work
              </h3>
              <span className="font-mono text-[13px] text-ink-60">
                {number(FEATURED)} to {number(projects.length - 1)}
              </span>
            </div>
            <ul
              role="list"
              className="m-0 grid list-none gap-10 p-0 min-[860px]:grid-cols-3 min-[860px]:gap-7"
            >
              {more.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
