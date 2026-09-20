import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PASSAGES_BY_FEELING } from '../data/feelings';
import { buildPrayer } from '../lib/prayer';
import { bumpStreak, loadStore, saveStore } from '../lib/storage';

export function Pray() {
  const [params] = useSearchParams();
  const mode = params.get('mode') || 'now';
  const passage = PASSAGES_BY_FEELING.peaceful[0];
  const title =
    mode === 'morning' ? 'Morning prayer' : mode === 'night' ? 'Night prayer' : 'Pray now';
  const feelingLabel =
    mode === 'morning' ? 'grateful' : mode === 'night' ? 'peaceful' : 'needing guidance';
  const [body] = useState(() =>
    buildPrayer({
      feelingLabel,
      passage,
      style: mode === 'night' ? 'deep' : 'personal',
      freeText:
        mode === 'morning'
          ? 'starting this day with You'
          : mode === 'night'
            ? 'ending this day and laying down what I carried'
            : undefined,
    }),
  );
  const store = useMemo(() => loadStore(), []);

  function amen() {
    const s = bumpStreak(loadStore());
    s.prayers = [
      { id: crypto.randomUUID(), body, label: title, at: new Date().toISOString() },
      ...s.prayers,
    ].slice(0, 50);
    saveStore(s);
  }

  return (
    <div className="stack">
      <div>
        <div className="eyebrow">Pray</div>
        <h1>{title}</h1>
        <p className="muted">Assisted prayer to help you talk with God — not a replacement for Scripture.</p>
      </div>
      <section className="card">
        <span className="ai-badge">Assisted prayer · not Scripture</span>
        <p style={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{body}</p>
        <div className="btn-row two">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              if (!window.speechSynthesis) return;
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(new SpeechSynthesisUtterance(body));
            }}
          >
            Pray aloud
          </button>
          <button type="button" className="btn btn-primary" onClick={amen}>
            Amen · Save
          </button>
        </div>
      </section>
      <section className="card">
        <div className="eyebrow">More</div>
        <div className="btn-row two" style={{ marginTop: 10 }}>
          <Link className="btn btn-ghost" to="/pray?mode=morning">
            Morning
          </Link>
          <Link className="btn btn-ghost" to="/pray?mode=night">
            Night
          </Link>
        </div>
        <div className="btn-row">
          <Link className="btn btn-ghost" to="/">
            How are you feeling?
          </Link>
        </div>
        {store.prayers[0] ? (
          <p className="muted" style={{ marginTop: 12, fontSize: '0.8rem' }}>
            Last saved: {store.prayers[0].label}
          </p>
        ) : null}
      </section>
    </div>
  );
}
