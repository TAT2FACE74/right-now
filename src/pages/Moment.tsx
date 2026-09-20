import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FEELINGS,
  PASSAGES_BY_FEELING,
  matchFeelingFromText,
  type FeelingId,
  type Passage,
} from '../data/feelings';
import { buildPrayer, type PrayerStyle } from '../lib/prayer';
import { bumpStreak, loadStore, saveStore } from '../lib/storage';

export function Moment() {
  const [params] = useSearchParams();
  const feelingParam = params.get('feeling') as FeelingId | null;
  const freeText = params.get('q') || '';
  const feelingId: FeelingId = feelingParam || matchFeelingFromText(freeText);
  const feeling = FEELINGS.find((f) => f.id === feelingId)!;
  const passages = PASSAGES_BY_FEELING[feelingId];

  const [selected, setSelected] = useState<Passage>(passages[0]);
  const [step, setStep] = useState<'word' | 'pray'>('word');
  const [style, setStyle] = useState<PrayerStyle>('personal');
  const [prayer, setPrayer] = useState('');
  const store = useMemo(() => loadStore(), []);

  function makePrayer(s: PrayerStyle = style) {
    return buildPrayer({
      feelingLabel: feeling.label,
      freeText,
      passage: selected,
      style: s,
    });
  }

  function openPray() {
    setPrayer(makePrayer());
    setStep('pray');
  }

  function savePrayer() {
    const s = bumpStreak(loadStore());
    s.prayers = [
      {
        id: crypto.randomUUID(),
        body: prayer,
        label: `${feeling.label} · ${selected.ref}`,
        at: new Date().toISOString(),
      },
      ...s.prayers,
    ].slice(0, 50);
    saveStore(s);
  }

  function bookmark() {
    const s = loadStore();
    s.bookmarks = [
      { ref: selected.ref, text: selected.text, savedAt: new Date().toISOString() },
      ...s.bookmarks.filter((b) => b.ref !== selected.ref),
    ].slice(0, 100);
    saveStore(s);
  }

  function speakPrayer() {
    if (!prayer || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(prayer);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  return (
    <div className="stack">
      <Link to="/" className="muted" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>
        ← Home
      </Link>
      <div>
        <div className="eyebrow">Feel → Word → Prayer</div>
        <h1 style={{ marginTop: 6 }}>
          {feeling.emoji} {feeling.label}
        </h1>
        {freeText ? <p className="muted">“{freeText}”</p> : null}
      </div>

      {step === 'word' && (
        <>
          <section className="card">
            <div className="eyebrow">Your Word for right now</div>
            <p className="muted" style={{ marginTop: 8, fontSize: '0.85rem' }}>
              These passages may offer encouragement for what you're experiencing. They are not a
              claim of God's specific private will for you.
            </p>
          </section>

          {passages.map((p) => (
            <button
              key={p.ref}
              type="button"
              className="card"
              style={{
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                borderColor: selected.ref === p.ref ? 'var(--gold)' : undefined,
              }}
              onClick={() => setSelected(p)}
            >
              <div className="scripture">“{p.text}”</div>
              <div className="ref">
                {p.ref} · {p.translation}
              </div>
              <p className="muted" style={{ marginTop: 10, fontSize: '0.82rem' }}>
                {p.why}
              </p>
            </button>
          ))}

          <div className="btn-row two">
            <button type="button" className="btn btn-ghost" onClick={bookmark}>
              Bookmark
            </button>
            <button type="button" className="btn btn-primary" onClick={openPray}>
              Pray about this
            </button>
          </div>
        </>
      )}

      {step === 'pray' && (
        <section className="card">
          <span className="ai-badge">Assisted prayer · not Scripture</span>
          <div className="eyebrow">Pray with me</div>
          <h2 style={{ marginTop: 8 }}>A prayer for this moment</h2>
          <div className="chip-row" style={{ margin: '12px 0' }}>
            {(['short', 'personal', 'deep', 'encouraging'] as PrayerStyle[]).map((s) => (
              <button
                key={s}
                type="button"
                className={`mini ${style === s ? 'active' : ''}`}
                onClick={() => {
                  setStyle(s);
                  setPrayer(makePrayer(s));
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <p style={{ lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{prayer}</p>
          <div className="btn-row two">
            <button type="button" className="btn btn-ghost" onClick={speakPrayer}>
              Pray aloud
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                savePrayer();
                setStep('word');
              }}
            >
              Amen · Save
            </button>
          </div>
          <p className="disclaimer">
            This prayer was generated to help you talk with God. It is not the Bible and not a
            prophetic message. Keep walking, {store.name}.
          </p>
        </section>
      )}
    </div>
  );
}
