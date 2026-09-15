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

export function ModeProvider({ children }: { children: ReactNode }) {
  // Always start in reader mode: a non-technical visitor should never have to
  // opt out of a code view. The stored preference is applied after mount.
  const [mode, setModeState] = useState<Mode>("reader");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "dev") setModeState("dev");
    } catch {
      // private mode, blocked storage, reader mode is the right fallback
    }
    setReady(true);
  }, []);

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // preference just won't persist
    }
  }, []);

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
