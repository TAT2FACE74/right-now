import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadStore, saveStore } from '../lib/storage';

export function Layout() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => loadStore().theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    const s = loadStore();
    s.theme = theme;
    saveStore(s);
  }, [theme]);

  return (
    <div className="app-shell">
      <div className="topbar">
        <div className="eyebrow">E*PRAY</div>
        <button className="pill" type="button" onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
      <Outlet />
      <nav className="nav" aria-label="Primary">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="ico">⌂</span>Home
        </NavLink>
        <NavLink to="/bible" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="ico">📖</span>Bible
        </NavLink>
        <NavLink to="/pray" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="ico">🙏</span>Pray
        </NavLink>
        <NavLink to="/plans" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="ico">✦</span>Plans
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="ico">◎</span>Profile
        </NavLink>
      </nav>
    </div>
  );
}
