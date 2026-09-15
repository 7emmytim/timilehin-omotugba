import experiences from "@/data/experiences.json";
import { Block, SectionHeading } from "./section";

/** "AFEX" -> "AF". Logos are remote LinkedIn URLs that expire, so initials. */
function initials(company: string) {
  return company.slice(0, 2).toUpperCase();
}

export function Experience() {
  return (
    <Block id="experience">
      <SectionHeading>Experience</SectionHeading>

      {experiences.map(
        ({ company, title, type, location, duration, description, skills }) => (
          <article
            key={`${company}-${title}`}
            className="grid grid-cols-[38px_minmax(0,1fr)] gap-3.5 border-t border-card-line py-[17px] first:border-t-0 first:pt-0"
          >
            <span className="grid h-[38px] w-[38px] place-items-center rounded-lg bg-card font-mono text-[12.5px] font-bold text-accent">
              {initials(company)}
            </span>

            <div>
              <h3 className="m-0 mb-1 text-base font-semibold text-white">
                {title} · {company}
              </h3>
              <p className="m-0 mb-2.5 font-mono text-[11.5px] text-mute">
                {type} · {location} · {duration}
              </p>
              <p className="m-0 mb-3 max-w-[64ch] text-[14.5px] leading-[1.6] text-fg/75">
                {description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded border border-card-line bg-card px-2 py-[3px] font-mono text-[10.5px] text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ),
      )}
    </Block>
  );
}
