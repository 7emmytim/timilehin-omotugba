import { useMode } from "@/context";
import { EditorShell } from "@/layout/editor";
import { DevPane, Terminal } from "@/layout/dev";
import { ReaderPane } from "@/layout/reader";

export function Home() {
  const { mode } = useMode();
  const dev = mode === "dev";

  return (
    <EditorShell panel={dev ? <Terminal /> : undefined}>
      {dev ? <DevPane /> : <ReaderPane />}
    </EditorShell>
  );
}
