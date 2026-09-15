import { About } from "./about";
import { Contact } from "./contact";
import { Experience } from "./experience";
import { GutteredPane } from "./gutter";
import { Work } from "./work";

export function ReaderPane() {
  return (
    <GutteredPane>
      <About />
      <Work />
      <Experience />
      <Contact />
    </GutteredPane>
  );
}
