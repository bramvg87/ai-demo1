import { useState, useCallback } from 'react';

const KEY = 'gb-ai-demo1-progress';

function load(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function persist(data: Record<string, boolean>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Record<string, boolean>>(load);

  const toggle = useCallback((id: string) => {
    setProgress(prev => {
      const next = { ...prev, [id]: !prev[id] };
      persist(next);
      return next;
    });
  }, []);

  const isDone = useCallback((id: string) => progress[id] ?? false, [progress]);

  return { isDone, toggle };
}
