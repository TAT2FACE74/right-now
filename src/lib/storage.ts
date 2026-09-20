const KEY = 'right-now-v1';

export type Store = {
  name: string;
  streak: number;
  lastActiveDay: string;
  bookmarks: { ref: string; text: string; savedAt: string }[];
  prayers: { id: string; body: string; label: string; at: string }[];
  theme: 'dark' | 'light';
};

const defaults: Store = {
  name: 'Friend',
  streak: 0,
  lastActiveDay: '',
  bookmarks: [],
  prayers: [],
  theme: 'dark',
};

export function loadStore(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaults };
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return { ...defaults };
  }
}

export function saveStore(s: Store) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function bumpStreak(s: Store): Store {
  const today = todayKey();
  if (s.lastActiveDay === today) return s;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = y.toISOString().slice(0, 10);
  const next = s.lastActiveDay === yesterday ? s.streak + 1 : 1;
  return { ...s, streak: next, lastActiveDay: today };
}

export function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}
