export const BOOKS = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther',
  'Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations',
  'Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah',
  'Haggai','Zechariah','Malachi','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians',
  '2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians',
  '1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John',
  '3 John','Jude','Revelation',
] as const;

export type BibleBook = (typeof BOOKS)[number];

/** Standard Protestant canon chapter counts (66 books). */
export const CHAPTER_COUNTS: Record<string, number> = {
  Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
  Joshua: 24, Judges: 21, Ruth: 4,
  '1 Samuel': 31, '2 Samuel': 24, '1 Kings': 22, '2 Kings': 25,
  '1 Chronicles': 29, '2 Chronicles': 36, Ezra: 10, Nehemiah: 13, Esther: 10,
  Job: 42, Psalms: 150, Proverbs: 31, Ecclesiastes: 12, 'Song of Solomon': 8,
  Isaiah: 66, Jeremiah: 52, Lamentations: 5, Ezekiel: 48, Daniel: 12,
  Hosea: 14, Joel: 3, Amos: 9, Obadiah: 1, Jonah: 4, Micah: 7, Nahum: 3,
  Habakkuk: 3, Zephaniah: 3, Haggai: 2, Zechariah: 14, Malachi: 4,
  Matthew: 28, Mark: 16, Luke: 24, John: 21, Acts: 28,
  Romans: 16, '1 Corinthians': 16, '2 Corinthians': 13, Galatians: 6,
  Ephesians: 6, Philippians: 4, Colossians: 4, '1 Thessalonians': 5,
  '2 Thessalonians': 3, '1 Timothy': 6, '2 Timothy': 4, Titus: 3, Philemon: 1,
  Hebrews: 13, James: 5, '1 Peter': 5, '2 Peter': 3, '1 John': 5,
  '2 John': 1, '3 John': 1, Jude: 1, Revelation: 22,
};

export type BibleVerse = { verse: number; text: string };

export type Passage = {
  reference: string;
  text: string;
  translation: string;
  verses: BibleVerse[];
  book: string;
  chapter: number;
};

type RedRange = { chapter: number; from: number; to: number };

/**
 * Best-effort traditional red-letter ranges (Jesus’ speech in the Gospels).
 * Applied by verse number only — not a scholarly critical edition.
 */
const RED_LETTER: Record<string, RedRange[]> = {
  Matthew: [
    { chapter: 3, from: 15, to: 15 },
    { chapter: 4, from: 4, to: 4 }, { chapter: 4, from: 7, to: 7 }, { chapter: 4, from: 10, to: 10 },
    { chapter: 4, from: 17, to: 17 }, { chapter: 4, from: 19, to: 19 },
    { chapter: 5, from: 3, to: 48 }, { chapter: 6, from: 1, to: 34 }, { chapter: 7, from: 1, to: 27 },
    { chapter: 8, from: 3, to: 4 }, { chapter: 8, from: 7, to: 7 }, { chapter: 8, from: 10, to: 13 },
    { chapter: 8, from: 20, to: 22 }, { chapter: 8, from: 26, to: 26 }, { chapter: 8, from: 32, to: 32 },
    { chapter: 9, from: 2, to: 6 }, { chapter: 9, from: 9, to: 9 }, { chapter: 9, from: 12, to: 13 },
    { chapter: 9, from: 15, to: 17 }, { chapter: 9, from: 22, to: 22 }, { chapter: 9, from: 24, to: 24 },
    { chapter: 9, from: 28, to: 29 }, { chapter: 9, from: 37, to: 38 },
    { chapter: 10, from: 5, to: 42 },
    { chapter: 11, from: 4, to: 19 }, { chapter: 11, from: 21, to: 24 }, { chapter: 11, from: 25, to: 30 },
    { chapter: 12, from: 3, to: 8 }, { chapter: 12, from: 11, to: 13 }, { chapter: 12, from: 25, to: 37 },
    { chapter: 12, from: 39, to: 45 }, { chapter: 12, from: 48, to: 50 },
    { chapter: 13, from: 3, to: 9 }, { chapter: 13, from: 11, to: 23 }, { chapter: 13, from: 24, to: 33 },
    { chapter: 13, from: 37, to: 43 }, { chapter: 13, from: 44, to: 50 }, { chapter: 13, from: 51, to: 52 },
    { chapter: 13, from: 57, to: 57 },
    { chapter: 14, from: 16, to: 16 }, { chapter: 14, from: 18, to: 18 }, { chapter: 14, from: 27, to: 31 },
    { chapter: 15, from: 3, to: 11 }, { chapter: 15, from: 13, to: 14 }, { chapter: 15, from: 16, to: 20 },
    { chapter: 15, from: 24, to: 28 }, { chapter: 15, from: 32, to: 34 },
    { chapter: 16, from: 2, to: 4 }, { chapter: 16, from: 6, to: 6 }, { chapter: 16, from: 8, to: 11 },
    { chapter: 16, from: 13, to: 19 }, { chapter: 16, from: 23, to: 28 },
    { chapter: 17, from: 7, to: 7 }, { chapter: 17, from: 9, to: 12 }, { chapter: 17, from: 17, to: 17 },
    { chapter: 17, from: 20, to: 21 }, { chapter: 17, from: 22, to: 23 }, { chapter: 17, from: 25, to: 27 },
    { chapter: 18, from: 3, to: 20 }, { chapter: 18, from: 22, to: 35 },
    { chapter: 19, from: 4, to: 12 }, { chapter: 19, from: 14, to: 14 }, { chapter: 19, from: 17, to: 21 },
    { chapter: 19, from: 23, to: 30 },
    { chapter: 20, from: 1, to: 16 }, { chapter: 20, from: 18, to: 19 }, { chapter: 20, from: 21, to: 23 },
    { chapter: 20, from: 25, to: 28 }, { chapter: 20, from: 32, to: 32 },
    { chapter: 21, from: 2, to: 3 }, { chapter: 21, from: 13, to: 13 }, { chapter: 21, from: 16, to: 16 },
    { chapter: 21, from: 19, to: 19 }, { chapter: 21, from: 21, to: 22 }, { chapter: 21, from: 24, to: 27 },
    { chapter: 21, from: 28, to: 44 },
    { chapter: 22, from: 2, to: 14 }, { chapter: 22, from: 18, to: 21 }, { chapter: 22, from: 29, to: 32 },
    { chapter: 22, from: 37, to: 40 }, { chapter: 22, from: 42, to: 45 },
    { chapter: 23, from: 2, to: 39 },
    { chapter: 24, from: 2, to: 51 }, { chapter: 25, from: 1, to: 46 },
    { chapter: 26, from: 2, to: 2 }, { chapter: 26, from: 10, to: 13 }, { chapter: 26, from: 18, to: 18 },
    { chapter: 26, from: 21, to: 21 }, { chapter: 26, from: 23, to: 29 }, { chapter: 26, from: 31, to: 32 },
    { chapter: 26, from: 34, to: 34 }, { chapter: 26, from: 36, to: 46 }, { chapter: 26, from: 50, to: 50 },
    { chapter: 26, from: 52, to: 56 }, { chapter: 26, from: 64, to: 64 },
    { chapter: 27, from: 11, to: 11 }, { chapter: 27, from: 46, to: 46 },
    { chapter: 28, from: 9, to: 10 }, { chapter: 28, from: 18, to: 20 },
  ],
  Mark: [
    { chapter: 1, from: 15, to: 15 }, { chapter: 1, from: 17, to: 17 }, { chapter: 1, from: 25, to: 25 },
    { chapter: 1, from: 38, to: 38 }, { chapter: 1, from: 41, to: 44 },
    { chapter: 2, from: 5, to: 11 }, { chapter: 2, from: 14, to: 14 }, { chapter: 2, from: 17, to: 17 },
    { chapter: 2, from: 19, to: 22 }, { chapter: 2, from: 25, to: 28 },
    { chapter: 3, from: 3, to: 5 }, { chapter: 3, from: 23, to: 29 }, { chapter: 3, from: 33, to: 35 },
    { chapter: 4, from: 3, to: 9 }, { chapter: 4, from: 11, to: 32 }, { chapter: 4, from: 35, to: 35 },
    { chapter: 4, from: 39, to: 40 },
    { chapter: 5, from: 8, to: 9 }, { chapter: 5, from: 19, to: 19 }, { chapter: 5, from: 30, to: 34 },
    { chapter: 5, from: 36, to: 36 }, { chapter: 5, from: 39, to: 41 },
    { chapter: 6, from: 4, to: 4 }, { chapter: 6, from: 10, to: 11 }, { chapter: 6, from: 31, to: 31 },
    { chapter: 6, from: 37, to: 38 }, { chapter: 6, from: 50, to: 50 },
    { chapter: 7, from: 6, to: 23 }, { chapter: 7, from: 27, to: 29 }, { chapter: 7, from: 34, to: 34 },
    { chapter: 8, from: 2, to: 3 }, { chapter: 8, from: 5, to: 5 }, { chapter: 8, from: 12, to: 12 },
    { chapter: 8, from: 15, to: 15 }, { chapter: 8, from: 17, to: 21 }, { chapter: 8, from: 26, to: 26 },
    { chapter: 8, from: 27, to: 29 }, { chapter: 8, from: 33, to: 38 },
    { chapter: 9, from: 1, to: 1 }, { chapter: 9, from: 12, to: 13 }, { chapter: 9, from: 16, to: 16 },
    { chapter: 9, from: 19, to: 19 }, { chapter: 9, from: 21, to: 23 }, { chapter: 9, from: 25, to: 25 },
    { chapter: 9, from: 29, to: 31 }, { chapter: 9, from: 33, to: 37 }, { chapter: 9, from: 39, to: 50 },
    { chapter: 10, from: 3, to: 9 }, { chapter: 10, from: 11, to: 12 }, { chapter: 10, from: 14, to: 15 },
    { chapter: 10, from: 18, to: 21 }, { chapter: 10, from: 23, to: 31 }, { chapter: 10, from: 33, to: 34 },
    { chapter: 10, from: 36, to: 40 }, { chapter: 10, from: 42, to: 45 }, { chapter: 10, from: 51, to: 52 },
    { chapter: 11, from: 2, to: 3 }, { chapter: 11, from: 14, to: 14 }, { chapter: 11, from: 17, to: 17 },
    { chapter: 11, from: 22, to: 26 }, { chapter: 11, from: 29, to: 33 },
    { chapter: 12, from: 1, to: 11 }, { chapter: 12, from: 15, to: 17 }, { chapter: 12, from: 24, to: 27 },
    { chapter: 12, from: 29, to: 31 }, { chapter: 12, from: 34, to: 34 }, { chapter: 12, from: 35, to: 37 },
    { chapter: 12, from: 38, to: 40 }, { chapter: 12, from: 43, to: 44 },
    { chapter: 13, from: 2, to: 37 },
    { chapter: 14, from: 6, to: 9 }, { chapter: 14, from: 13, to: 15 }, { chapter: 14, from: 18, to: 21 },
    { chapter: 14, from: 22, to: 25 }, { chapter: 14, from: 27, to: 28 }, { chapter: 14, from: 30, to: 30 },
    { chapter: 14, from: 32, to: 42 }, { chapter: 14, from: 48, to: 49 }, { chapter: 14, from: 62, to: 62 },
    { chapter: 15, from: 2, to: 2 }, { chapter: 15, from: 34, to: 34 },
    { chapter: 16, from: 15, to: 18 },
  ],
  Luke: [
    { chapter: 2, from: 49, to: 49 },
    { chapter: 4, from: 4, to: 4 }, { chapter: 4, from: 8, to: 8 }, { chapter: 4, from: 12, to: 12 },
    { chapter: 4, from: 18, to: 21 }, { chapter: 4, from: 23, to: 27 }, { chapter: 4, from: 35, to: 35 },
    { chapter: 4, from: 43, to: 43 },
    { chapter: 5, from: 4, to: 4 }, { chapter: 5, from: 10, to: 10 }, { chapter: 5, from: 13, to: 14 },
    { chapter: 5, from: 20, to: 24 }, { chapter: 5, from: 27, to: 27 }, { chapter: 5, from: 31, to: 32 },
    { chapter: 5, from: 34, to: 39 },
    { chapter: 6, from: 3, to: 5 }, { chapter: 6, from: 8, to: 10 }, { chapter: 6, from: 20, to: 49 },
    { chapter: 7, from: 9, to: 9 }, { chapter: 7, from: 13, to: 14 }, { chapter: 7, from: 22, to: 28 },
    { chapter: 7, from: 31, to: 35 }, { chapter: 7, from: 40, to: 47 }, { chapter: 7, from: 50, to: 50 },
    { chapter: 8, from: 5, to: 8 }, { chapter: 8, from: 10, to: 18 }, { chapter: 8, from: 21, to: 22 },
    { chapter: 8, from: 25, to: 25 }, { chapter: 8, from: 30, to: 30 }, { chapter: 8, from: 39, to: 39 },
    { chapter: 8, from: 45, to: 48 }, { chapter: 8, from: 50, to: 50 }, { chapter: 8, from: 52, to: 54 },
    { chapter: 9, from: 3, to: 5 }, { chapter: 9, from: 13, to: 14 }, { chapter: 9, from: 18, to: 22 },
    { chapter: 9, from: 23, to: 27 }, { chapter: 9, from: 41, to: 41 }, { chapter: 9, from: 44, to: 44 },
    { chapter: 9, from: 48, to: 48 }, { chapter: 9, from: 50, to: 50 }, { chapter: 9, from: 55, to: 56 },
    { chapter: 9, from: 58, to: 62 },
    { chapter: 10, from: 2, to: 16 }, { chapter: 10, from: 18, to: 24 }, { chapter: 10, from: 26, to: 28 },
    { chapter: 10, from: 30, to: 37 }, { chapter: 10, from: 41, to: 42 },
    { chapter: 11, from: 2, to: 13 }, { chapter: 11, from: 17, to: 26 }, { chapter: 11, from: 28, to: 36 },
    { chapter: 11, from: 39, to: 52 },
    { chapter: 12, from: 1, to: 12 }, { chapter: 12, from: 14, to: 40 }, { chapter: 12, from: 42, to: 59 },
    { chapter: 13, from: 2, to: 9 }, { chapter: 13, from: 12, to: 16 }, { chapter: 13, from: 18, to: 21 },
    { chapter: 13, from: 24, to: 30 }, { chapter: 13, from: 32, to: 35 },
    { chapter: 14, from: 3, to: 5 }, { chapter: 14, from: 8, to: 14 }, { chapter: 14, from: 16, to: 24 },
    { chapter: 14, from: 26, to: 35 },
    { chapter: 15, from: 4, to: 32 },
    { chapter: 16, from: 1, to: 13 }, { chapter: 16, from: 15, to: 31 },
    { chapter: 17, from: 1, to: 10 }, { chapter: 17, from: 14, to: 14 }, { chapter: 17, from: 17, to: 19 },
    { chapter: 17, from: 20, to: 37 },
    { chapter: 18, from: 1, to: 8 }, { chapter: 18, from: 10, to: 14 }, { chapter: 18, from: 16, to: 17 },
    { chapter: 18, from: 19, to: 22 }, { chapter: 18, from: 24, to: 30 }, { chapter: 18, from: 31, to: 33 },
    { chapter: 18, from: 41, to: 42 },
    { chapter: 19, from: 5, to: 5 }, { chapter: 19, from: 9, to: 10 }, { chapter: 19, from: 12, to: 27 },
    { chapter: 19, from: 30, to: 31 }, { chapter: 19, from: 40, to: 40 }, { chapter: 19, from: 42, to: 44 },
    { chapter: 19, from: 46, to: 46 },
    { chapter: 20, from: 3, to: 8 }, { chapter: 20, from: 9, to: 18 }, { chapter: 20, from: 23, to: 25 },
    { chapter: 20, from: 34, to: 38 }, { chapter: 20, from: 41, to: 44 }, { chapter: 20, from: 46, to: 47 },
    { chapter: 21, from: 3, to: 4 }, { chapter: 21, from: 6, to: 36 },
    { chapter: 22, from: 8, to: 12 }, { chapter: 22, from: 15, to: 22 }, { chapter: 22, from: 25, to: 30 },
    { chapter: 22, from: 31, to: 34 }, { chapter: 22, from: 35, to: 38 }, { chapter: 22, from: 40, to: 46 },
    { chapter: 22, from: 48, to: 48 }, { chapter: 22, from: 51, to: 53 }, { chapter: 22, from: 67, to: 70 },
    { chapter: 23, from: 3, to: 3 }, { chapter: 23, from: 28, to: 31 }, { chapter: 23, from: 34, to: 34 },
    { chapter: 23, from: 43, to: 43 }, { chapter: 23, from: 46, to: 46 },
    { chapter: 24, from: 17, to: 17 }, { chapter: 24, from: 19, to: 19 }, { chapter: 24, from: 25, to: 26 },
    { chapter: 24, from: 36, to: 49 },
  ],
  John: [
    { chapter: 1, from: 38, to: 39 }, { chapter: 1, from: 42, to: 43 }, { chapter: 1, from: 47, to: 51 },
    { chapter: 2, from: 4, to: 4 }, { chapter: 2, from: 7, to: 8 }, { chapter: 2, from: 16, to: 16 },
    { chapter: 2, from: 19, to: 19 },
    { chapter: 3, from: 3, to: 21 },
    { chapter: 4, from: 7, to: 26 }, { chapter: 4, from: 32, to: 38 }, { chapter: 4, from: 48, to: 50 },
    { chapter: 5, from: 6, to: 8 }, { chapter: 5, from: 14, to: 14 }, { chapter: 5, from: 17, to: 47 },
    { chapter: 6, from: 5, to: 5 }, { chapter: 6, from: 10, to: 10 }, { chapter: 6, from: 12, to: 12 },
    { chapter: 6, from: 20, to: 20 }, { chapter: 6, from: 26, to: 58 }, { chapter: 6, from: 61, to: 65 },
    { chapter: 6, from: 67, to: 70 },
    { chapter: 7, from: 6, to: 8 }, { chapter: 7, from: 16, to: 19 }, { chapter: 7, from: 21, to: 24 },
    { chapter: 7, from: 28, to: 29 }, { chapter: 7, from: 33, to: 34 }, { chapter: 7, from: 37, to: 38 },
    { chapter: 8, from: 7, to: 7 }, { chapter: 8, from: 10, to: 12 }, { chapter: 8, from: 14, to: 19 },
    { chapter: 8, from: 21, to: 26 }, { chapter: 8, from: 28, to: 29 }, { chapter: 8, from: 31, to: 59 },
    { chapter: 9, from: 3, to: 5 }, { chapter: 9, from: 7, to: 7 }, { chapter: 9, from: 35, to: 41 },
    { chapter: 10, from: 1, to: 18 }, { chapter: 10, from: 25, to: 30 }, { chapter: 10, from: 32, to: 38 },
    { chapter: 11, from: 4, to: 4 }, { chapter: 11, from: 7, to: 11 }, { chapter: 11, from: 14, to: 15 },
    { chapter: 11, from: 23, to: 26 }, { chapter: 11, from: 34, to: 34 }, { chapter: 11, from: 39, to: 44 },
    { chapter: 12, from: 7, to: 8 }, { chapter: 12, from: 23, to: 28 }, { chapter: 12, from: 30, to: 36 },
    { chapter: 12, from: 44, to: 50 },
    { chapter: 13, from: 7, to: 8 }, { chapter: 13, from: 10, to: 17 }, { chapter: 13, from: 19, to: 21 },
    { chapter: 13, from: 26, to: 27 }, { chapter: 13, from: 31, to: 38 },
    { chapter: 14, from: 1, to: 31 }, { chapter: 15, from: 1, to: 27 }, { chapter: 16, from: 1, to: 33 },
    { chapter: 17, from: 1, to: 26 },
    { chapter: 18, from: 4, to: 9 }, { chapter: 18, from: 11, to: 11 }, { chapter: 18, from: 20, to: 21 },
    { chapter: 18, from: 23, to: 23 }, { chapter: 18, from: 34, to: 37 },
    { chapter: 19, from: 11, to: 11 }, { chapter: 19, from: 26, to: 28 }, { chapter: 19, from: 30, to: 30 },
    { chapter: 20, from: 15, to: 17 }, { chapter: 20, from: 19, to: 23 }, { chapter: 20, from: 26, to: 29 },
    { chapter: 21, from: 5, to: 6 }, { chapter: 21, from: 10, to: 12 }, { chapter: 21, from: 15, to: 22 },
  ],
};

export function isRedLetter(book: string, chapter: number, verse: number): boolean {
  const ranges = RED_LETTER[book];
  if (!ranges) return false;
  return ranges.some((r) => r.chapter === chapter && verse >= r.from && verse <= r.to);
}

export function chapterCount(book: string): number {
  return CHAPTER_COUNTS[book] ?? 1;
}

export async function fetchPassage(query: string): Promise<Passage | null> {
  const q = encodeURIComponent(query.trim());
  if (!q) return null;
  try {
    const res = await fetch(`https://bible-api.com/${q}?translation=kjv`);
    if (!res.ok) return null;
    const data = await res.json();
    const verses: BibleVerse[] = Array.isArray(data.verses)
      ? data.verses.map((v: { verse?: number; text?: string }) => ({
          verse: Number(v.verse) || 0,
          text: String(v.text || '').replace(/\s+/g, ' ').trim(),
        })).filter((v: BibleVerse) => v.verse > 0 && v.text)
      : [];
    const text =
      verses.length > 0
        ? verses.map((v) => v.text).join(' ')
        : String(data.text || '').replace(/\s+/g, ' ').trim();
    // Parse book/chapter from reference when possible (e.g. "John 3:16" or "Genesis 1")
    const ref = String(data.reference || query);
    let book = '';
    let chapter = 1;
    const m = ref.match(/^(.+?)\s+(\d+)(?::\d+)?(?:\s*[-–].*)?$/);
    if (m) {
      book = m[1].trim();
      chapter = Number(m[2]) || 1;
    }
    return {
      reference: ref,
      text,
      translation: String(data.translation_id || 'kjv').toUpperCase(),
      verses,
      book,
      chapter,
    };
  } catch {
    return null;
  }
}

export async function fetchChapter(book: string, chapter: number): Promise<Passage | null> {
  return fetchPassage(`${book} ${chapter}`);
}
