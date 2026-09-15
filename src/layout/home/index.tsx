import { useMode, useNav } from "@/context";
import { EditorShell } from "@/layout/editor";
import { DevPane, Terminal } from "@/layout/dev";
import { ReaderPane } from "@/layout/reader";
import { ResumeViewer } from "@/layout/resume";

export function Home() {
  const { mode } = useMode();
  const { openFile } = useNav();
  const resume = openFile === "resume";
  const dev = mode === "dev";

  return (
    <EditorShell panel={dev && !resume ? <Terminal /> : undefined}>
      {resume ? <ResumeViewer /> : dev ? <DevPane /> : <ReaderPane />}
    </EditorShell>
  );
}
