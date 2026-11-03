import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const KEY = 'mangisha:shortlist:v1';
const MAX_COMPARE = 3;

type ShortlistApi = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  maxCompare: number;
};
const Ctx = createContext<ShortlistApi | null>(null);

const read = (): string[] => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
};

export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(read);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* storage unavailable (private mode) — shortlist still works for this visit */
    }
  }, [ids]);

  const toggle = useCallback((id: string) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])), []);
  const remove = useCallback((id: string) => {
    setIds((p) => p.filter((x) => x !== id));
    setCompareIds((p) => p.filter((x) => x !== id));
  }, []);
  const clear = useCallback(() => {
    setIds([]);
    setCompareIds([]);
  }, []);
  const toggleCompare = useCallback(
    (id: string) => setCompareIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= MAX_COMPARE ? p : [...p, id])),
    [],
  );

  const value = useMemo(
    () => ({ ids, has: (id: string) => ids.includes(id), toggle, remove, clear, compareIds, toggleCompare, maxCompare: MAX_COMPARE }),
    [ids, compareIds, toggle, remove, clear, toggleCompare],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useShortlist = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useShortlist must be used inside ShortlistProvider');
  return c;
};
