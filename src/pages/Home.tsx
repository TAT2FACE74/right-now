import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FEELINGS } from '../data/feelings';
import { greeting, loadStore } from '../lib/storage';

export function Home() {
  const nav = useNavigate();
  const store = useMemo(() => loadStore(), []);
  const [text, setText] = useState('');

  return (
    <div className="stack">
      <div>
        <h1>
          {greeting()}, {store.name}.
        </h1>
        <p className="muted" style={{ margin: '8px 0 0' }}>
          Whatever you're going through, start here.
        </p>
      </div>

      <div className="streak">🔥 {store.streak} day streak</div>

      <section className="card">
        <div className="eyebrow">How are you feeling today?</div>
        <h2 style={{ marginTop: 8, marginBottom: 14 }}>Choose a word</h2>
        <div className="feel-grid">
          {FEELINGS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="feel-chip"
              onClick={() => nav(`/moment?feeling=${f.id}`)}
            >
              <strong>
                {f.emoji} {f.label}
              </strong>
              <span>Find Scripture</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="eyebrow">Or tell me what's going on</div>
        <h2 style={{ marginTop: 8, marginBottom: 12 }}>In your own words</h2>
        <textarea
          className="field"
          placeholder="Tell God what you're dealing with…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!text.trim()}
            onClick={() => nav(`/moment?q=${encodeURIComponent(text.trim())}`)}
          >
            Find Scripture
          </button>
        </div>
      </section>

      <section className="card">
        <div className="eyebrow">Quick actions</div>
        <div className="btn-row two" style={{ marginTop: 12 }}>
          <Link className="btn btn-ghost" to="/pray?mode=morning">
            🌅 Morning
          </Link>
          <Link className="btn btn-ghost" to="/pray?mode=night">
            🌙 Night
          </Link>
        </div>
        <div className="btn-row">
          <Link className="btn btn-ghost" to="/bible">
            📖 Open Bible
          </Link>
        </div>
      </section>

      <p className="disclaimer">
        E*PRAY helps you find Scripture and pray. It does not replace God, the Bible, pastors,
        counselors, medical care, or emergency services. If you are in crisis, contact local
        emergency help or a trusted person immediately.
      </p>
    </div>
  );
}
