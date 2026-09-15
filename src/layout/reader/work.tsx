import Image from "next/image";
import Link from "next/link";
import projects from "@/data/projects.json";
import { TransmitRight } from "@/icons";
import { Block, SectionHeading } from "./section";

/** Strips protocol and trailing slash so the link reads as a domain. */
function domain(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function Work() {
  return (
    <Block id="work">
      <SectionHeading>Selected work</SectionHeading>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(258px,1fr))] gap-[18px]">
        {projects.map(({ name, company, image, url }) => (
          <Link
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-[9px] border border-card-line bg-card transition-colors hover:border-accent"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-editor">
              <Image
                src={`/images/${image}.png`}
                alt={`${name} screenshot`}
                fill
                sizes="(max-width: 980px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="px-3.5 pt-3.5 pb-4">
              <h3 className="m-0 mb-1 text-[14.5px] font-semibold text-white">
                {name}
              </h3>
              <span className="font-mono text-[11px] text-mute">{company}</span>
              <span className="mt-2.5 flex items-center gap-1.5 font-mono text-[11px] text-accent">
                <span className="truncate">{domain(url)}</span>
                <TransmitRight className="h-3 w-3 flex-none transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Block>
  );
}
