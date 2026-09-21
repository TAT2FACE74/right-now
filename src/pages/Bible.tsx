import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BOOKS,
  chapterCount,
  fetchChapter,
  isRedLetter,
  type Passage,
} from '../lib/bibleApi';
import { loadStore, saveStore } from '../lib/storage';
import { speakPastor } from '../lib/speak';

const DEFAULT = { book: 'Genesis', chapter: 1, verse: 1 };

function clampChapter(book: string, chapter: number) {
  const max = chapterCount(book);
  return Math.min(Math.max(1, chapter || 1), max);
}

export function Bible() {
  const saved = loadStore().readingPlace;
  const [book, setBook] = useState(saved?.book && BOOKS.includes(saved.book as (typeof BOOKS)[number]) ? saved.book : DEFAULT.book);
  const [chapter, setChapter] = useState(() =>
    clampChapter(
      saved?.book && BOOKS.includes(saved.book as (typeof BOOKS)[number]) ? saved.book : DEFAULT.book,
      saved?.chapter ?? DEFAULT.chapter,
    ),
  );
  const [verse, setVerse] = useState(saved?.verse ?? DEFAULT.verse);
  const [result, setResult] = useState<Passage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flip, setFlip] = useState<'idle' | 'next' | 'prev'>('idle');
  const verseRefs = useRef<Map<number, HTMLElement>>(new Map());
  const loadGen = useRef(0);

  const persist = useCallback((b: string, c: number, v: number) => {
    const s = loadStore();
    s.readingPlace = { book: b, chapter: c, verse: v };
    saveStore(s);
  }, []);

  const load = useCallback(
    async (b: string, c: number, v: number, anim: 'idle' | 'next' | 'prev' = 'idle') => {
      const ch = clampChapter(b, c);
      const gen = ++loadGen.current;
      if (anim !== 'idle') {
        setFlip(anim);
        await new Promise((r) => setTimeout(r, 180));
      }
      setLoading(true);
      setError('');
      const data = await fetchChapter(b, ch);
      if (gen !== loadGen.current) return;
      setLoading(false);
      if (!data || !data.verses.length) {
        setError('Could not load that chapter. Try another selection.');
        setResult(null);
        setFlip('idle');
        return;
      }
      const maxV = data.verses[data.verses.length - 1]?.verse ?? 1;
      const nextVerse = Math.min(Math.max(1, v), maxV);
      setBook(b);
      setChapter(ch);
      setVerse(nextVerse);
      setResult({ ...data, book: b, chapter: ch });
      persist(b, ch, nextVerse);
      requestAnimationFrame(() => setFlip('idle'));
    },
    [persist],
  );

  // First visit / restore
  useEffect(() => {
    void load(book, chapter, verse, 'idle');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll / highlight selected verse when result or verse changes
  useEffect(() => {
    if (!result) return;
    const el = verseRefs.current.get(verse);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [result, verse]);

  function onBookChange(nextBook: string) {
    void load(nextBook, 1, 1, 'next');
  }

  function onChapterChange(nextChapter: number) {
    void load(book, nextChapter, 1, nextChapter > chapter ? 'next' : 'prev');
  }

  function onVerseChange(nextVerse: number) {
    setVerse(nextVerse);
    persist(book, chapter, nextVerse);
  }

  function prevChapter() {
    if (chapter > 1) {
      void load(book, chapter - 1, 1, 'prev');
      return;
    }
    const idx = BOOKS.indexOf(book as (typeof BOOKS)[number]);
    if (idx > 0) {
      const prevBook = BOOKS[idx - 1];
      void load(prevBook, chapterCount(prevBook), 1, 'prev');
    }
  }

  function nextChapter() {
    const max = chapterCount(book);
    if (chapter < max) {
      void load(book, chapter + 1, 1, 'next');
      return;
    }
    const idx = BOOKS.indexOf(book as (typeof BOOKS)[number]);
    if (idx >= 0 && idx < BOOKS.length - 1) {
      void load(BOOKS[idx + 1], 1, 1, 'next');
    }
  }

  function bookmark() {
    if (!result) return;
    const verseObj = result.verses.find((v) => v.verse === verse);
    const text = verseObj?.text ?? result.text;
    const ref = `${book} ${chapter}:${verse}`;
    const s = loadStore();
    s.bookmarks = [
      { ref, text, savedAt: new Date().toISOString() },
      ...s.bookmarks.filter((b) => b.ref !== ref),
    ].slice(0, 100);
    saveStore(s);
  }

  const chapters = Array.from({ length: chapterCount(book) }, (_, i) => i + 1);
  const verseOptions = result?.verses.map((v) => v.verse) ?? [1];
  const canPrev =
    chapter > 1 || BOOKS.indexOf(book as (typeof BOOKS)[number]) > 0;
  const canNext =
    chapter < chapterCount(book) ||
    (BOOKS.indexOf(book as (typeof BOOKS)[number]) >= 0 &&
      BOOKS.indexOf(book as (typeof BOOKS)[number]) < BOOKS.length - 1);

  return (
    <div className="stack bible-page">
      <div>
        <div className="eyebrow">Bible</div>
        <h1>Read the Word</h1>
        <p className="muted">Public-domain KJV · Book, chapter &amp; verse — no colon needed.</p>
      </div>

      <div className="bible-nav card">
        <div className="bible-selects">
          <label className="bible-label">
            <span>Book</span>
            <select
              className="field"
              value={book}
              onChange={(e) => onBookChange(e.target.value)}
              disabled={loading}
            >
              {BOOKS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
          <label className="bible-label">
            <span>Chapter</span>
            <select
              className="field"
              value={chapter}
              onChange={(e) => onChapterChange(Number(e.target.value))}
              disabled={loading}
            >
              {chapters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="bible-label">
            <span>Verse</span>
            <select
              className="field"
              value={verse}
              onChange={(e) => onVerseChange(Number(e.target.value))}
              disabled={loading || !result}
            >
              {verseOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="btn-row two bible-turn-row">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={prevChapter}
            disabled={loading || !canPrev}
          >
            ← Prev
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={nextChapter}
            disabled={loading || !canNext}
          >
            Next →
          </button>
        </div>
      </div>

      {error ? <p className="muted">{error}</p> : null}

      <div className="leather-bible">
        <div className="leather-spine" aria-hidden />
        <div className="leather-cover">
          <div
            className={`parchment-page${flip === 'next' ? ' flip-next' : ''}${flip === 'prev' ? ' flip-prev' : ''}`}
          >
            <div className="parchment-inner">
              <div className="bible-ref-line">
                {result ? (
                  <>
                    {book} {chapter}
                    <span className="bible-trans"> · {result.translation}</span>
                  </>
                ) : loading ? (
                  'Opening…'
                ) : (
                  `${book} ${chapter}`
                )}
              </div>

              {loading && !result ? (
                <p className="parchment-loading">Turning the page…</p>
              ) : null}

              {result && (
                <div className="bible-verses" aria-live="polite">
                  {result.verses.map((v) => {
                    const red = isRedLetter(book, chapter, v.verse);
                    const active = v.verse === verse;
                    return (
                      <p
                        key={v.verse}
                        className={`bible-verse${red ? ' red-letter' : ''}${active ? ' verse-active' : ''}`}
                        ref={(el) => {
                          if (el) verseRefs.current.set(v.verse, el);
                          else verseRefs.current.delete(v.verse);
                        }}
                        onClick={() => onVerseChange(v.verse)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onVerseChange(v.verse);
                          }
                        }}
                      >
                        <sup className="verse-num">{v.verse}</sup>
                        {v.text}
                      </p>
                    );
                  })}
                </div>
              )}

              <p className="red-letter-note">
                Red letter marks Jesus’ words in the Gospels (traditional best-effort ranges).
                Scripture text is KJV only from bible-api.com — never invented.
              </p>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="btn-row two">
          <button type="button" className="btn btn-ghost" onClick={bookmark}>
            Bookmark
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              const verseObj = result.verses.find((v) => v.verse === verse);
              void speakPastor(verseObj?.text ?? result.text);
            }}
          >
            Listen
          </button>
        </div>
      )}
    </div>
  );
}
