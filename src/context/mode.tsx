import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Mode = "reader" | "dev";

const STORAGE_KEY = "portfolio-mode";

type ModeContextValue = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  /** False until the stored preference has been read, so we never flash the wrong mode. */
  ready: boolean;
};

const ModeContext = createContext<ModeContextValue | null>(null);

/** `?view=code` or `?view=simple`, so a link can open a specific view. */
function modeFromUrl(): Mode | null {
  const view = new URLSearchParams(window.location.search).get("view");
  if (view === "code") return "dev";
  if (view === "simple") return "reader";
  return null;
}

export function ModeProvider({ children }: { children: ReactNode }) {
  // Always start in reader mode: a non-technical visitor should never have to
  // opt out of a code view. The stored preference is applied after mount.
  const [mode, setModeState] = useState<Mode>("reader");
  const [ready, setReady] = useState(false);

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // preference just won't persist
    }
  }, []);

  useEffect(() => {
    // A view in the link wins over the stored preference, and replaces it.
    const requested = modeFromUrl();
    if (requested) {
      setMode(requested);
    } else {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "dev") setModeState("dev");
      } catch {
        // private mode, blocked storage, reader mode is the right fallback
      }
    }
    setReady(true);
  }, [setMode]);

  // The page background lives on <html> (see globals.css), so it follows the mode.
  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode, ready }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within a ModeProvider");
  return ctx;
}
