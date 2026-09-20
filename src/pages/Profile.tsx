import { useState } from 'react';
import { loadStore, saveStore } from '../lib/storage';

export function Profile() {
  const [store, setStore] = useState(() => loadStore());
  const [name, setName] = useState(store.name);

  function saveName() {
    const s = { ...loadStore(), name: name.trim() || 'Friend' };
    saveStore(s);
    setStore(s);
  }

  return (
    <div className="stack">
      <div>
        <div className="eyebrow">Profile</div>
        <h1>{store.name}</h1>
        <p className="muted">Your journey, privately on this device for now.</p>
      </div>

      <section className="card">
        <div className="eyebrow">What should we call you?</div>
        <input className="field" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={saveName}>
            Save name
          </button>
        </div>
      </section>

      <section className="card">
        <h2>Your journey</h2>
        <p>🔥 {store.streak} day streak</p>
        <p className="muted">🙏 {store.prayers.length} saved prayers</p>
        <p className="muted">📖 {store.bookmarks.length} bookmarks</p>
      </section>

      {store.bookmarks.length > 0 && (
        <section className="card">
          <div className="eyebrow">Bookmarks</div>
          {store.bookmarks.slice(0, 8).map((b) => (
            <div key={b.ref} style={{ marginTop: 12 }}>
              <div className="ref">{b.ref}</div>
              <p className="muted" style={{ fontSize: '0.85rem' }}>
                {b.text.slice(0, 140)}
                {b.text.length > 140 ? '…' : ''}
              </p>
            </div>
          ))}
        </section>
      )}

      <p className="disclaimer">
        Journals, moods, and prayers are sensitive. This Phase 1 build stores them locally in your
        browser. Cloud sync and stronger privacy controls come later.
      </p>
    </div>
  );
}
