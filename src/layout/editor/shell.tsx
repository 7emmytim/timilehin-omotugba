import type { ReactNode } from "react";
import { useNav } from "@/context";
import { ViewSwitchButton } from "@/layout/common/view-switch-button";
import { ActivityBar } from "./activity-bar";
import { Explorer } from "./explorer";
import { Minimap } from "./minimap";
import { StatusBar } from "./status-bar";
import { TabStrip } from "./tab-strip";
import { TitleBar } from "./title-bar";

/**
 * The editor chrome. Fills the viewport and never scrolls itself, only the
 * editor pane scrolls, the way a real editor behaves.
 */
export function EditorShell({
  children,
  panel,
}: {
  children: ReactNode;
  /** Optional bottom panel (the terminal, in dev mode). */
  panel?: ReactNode;
}) {
  const { scrollerRef, openFile } = useNav();

  return (
    <>
      <ViewSwitchButton />
      <div className="grid h-[100dvh] grid-rows-[auto_minmax(0,1fr)_auto_auto] overflow-hidden bg-editor">
        <TitleBar />

        <div className={`grid min-h-0 grid-cols-[minmax(0,1fr)] ${
            openFile === "resume"
              ? "lg:grid-cols-[48px_240px_minmax(0,1fr)]"
              : "lg:grid-cols-[48px_240px_minmax(0,1fr)_62px]"
          }`}>
          <ActivityBar />
          <Explorer />

          {/* min-h-0 matters: grid items default to min-height:auto, so without
              it this column outgrows its track and the pane clips instead of
              scrolling. */}
          <div className="grid min-h-0 min-w-0 grid-rows-[auto_auto_minmax(0,1fr)] bg-editor">
            <TabStrip />
            <div
              ref={scrollerRef}
              className="overflow-x-hidden overflow-y-auto editor-scroll"
            >
              {children}
            </div>
          </div>

          {openFile === "doc" && <Minimap />}
        </div>

        {panel}
        <StatusBar />
      </div>
    </>
  );
}
