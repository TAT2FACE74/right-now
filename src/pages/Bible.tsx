import { useState } from 'react';
import { BOOKS, fetchPassage } from '../lib/bibleApi';
import { loadStore, saveStore } from '../lib/storage';
import { speakPastor } from '../lib/speak';

export function Bible() {
  const [book, setBook] = useState('John');
  const [chapter, setChapter] = useState(3);
  const [query, setQuery] = useState('John 3:16');
  const [result, setResult] = useState<{ reference: string; text: string; translation: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load(q: string) {
    setLoading(true);
    setError('');
    const data = await fetchPassage(q);
    setLoading(false);
    if (!data) {
      setError('Could not load that passage. Try another reference.');
      setResult(null);
      return;
    }
    setResult(data);
  }

  function bookmark() {
    if (!result) return;
    const s = loadStore();
    s.bookmarks = [
      { ref: result.reference, text: result.text, savedAt: new Date().toISOString() },
      ...s.bookmarks.filter((b) => b.ref !== result.reference),
    ].slice(0, 100);
    saveStore(s);
  }

  return (
    <div className="stack">
      <div>
        <div className="eyebrow">Bible</div>
        <h1>Read the Word</h1>
        <p className="muted">Public-domain KJV via bible-api.com. More translations later.</p>
      </div>

      <section className="card">
        <div className="btn-row two">
          <select className="field" value={book} onChange={(e) => setBook(e.target.value)}>
            {BOOKS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <input
            className="field"
            type="number"
            min={1}
            value={chapter}
            onChange={(e) => setChapter(Number(e.target.value) || 1)}
          />
        </div>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => load(`${book} ${chapter}`)}
            disabled={loading}
          >
            {loading ? 'Loading…' : 'Open chapter'}
          </button>
        </div>
      </section>

      <section className="card">
        <div className="eyebrow">Search</div>
        <input
          className="field"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Psalm 23:1 or fear not"
        />
        <div className="btn-row">
          <button type="button" className="btn btn-ghost" onClick={() => load(query)} disabled={loading}>
            Search / go
          </button>
        </div>
      </section>

      {error ? <p className="muted">{error}</p> : null}

      {result && (
        <section className="card">
          <div className="ref">{result.reference} · {result.translation}</div>
          <p className="scripture" style={{ marginTop: 12 }}>
            {result.text}
          </p>
          <div className="btn-row two">
            <button type="button" className="btn btn-ghost" onClick={bookmark}>
              Bookmark
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => { if (result) void speakPastor(result.text); }}
            >
              Listen
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
