import { useMode, useNav } from "@/context";
import { EditorShell } from "@/layout/editor";
import { DevPane, Terminal } from "@/layout/dev";
import { PlainPage } from "@/layout/plain";
import { ResumeViewer } from "@/layout/resume";

export function Home() {
  const { mode } = useMode();
  const { openFile } = useNav();
  const resume = openFile === "resume";

  if (mode === "reader") return <PlainPage />;

  return (
    <EditorShell panel={resume ? undefined : <Terminal />}>
      {resume ? <ResumeViewer /> : <DevPane />}
    </EditorShell>
  );
}
