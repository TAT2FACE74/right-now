export const BOOKS = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther',
  'Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations',
  'Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah',
  'Haggai','Zechariah','Malachi','Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians',
  '2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians',
  '1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John',
  '3 John','Jude','Revelation',
];

export async function fetchPassage(query: string) {
  const q = encodeURIComponent(query.trim());
  if (!q) return null;
  try {
    const res = await fetch(`https://bible-api.com/${q}?translation=kjv`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      reference: String(data.reference || query),
      text: String(data.text || '').replace(/\s+/g, ' ').trim(),
      translation: String(data.translation_id || 'kjv').toUpperCase(),
    };
  } catch {
    return null;
  }
}
