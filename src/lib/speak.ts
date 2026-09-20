/** Pastor-style speak: deep middle-aged male neural voice, then Web Speech fallback. */

const NEURAL_TTS_URL =
  (import.meta.env.VITE_TTS_URL as string | undefined) ||
  'https://oracle-nine-alpha.vercel.app/api/tts';

let currentAudio: HTMLAudioElement | null = null;

const PASTOR_VOICE_HINTS = [
  'christopher',
  'guy',
  'davis',
  'daniel',
  'james',
  'aaron',
  'andrew',
  'brian',
  'david',
  'mark',
  'google uk english male',
  'microsoft david',
  'microsoft mark',
  'english male',
];

function scoreVoice(v: SpeechSynthesisVoice): number {
  const n = `${v.name} ${v.lang}`.toLowerCase();
  if (!n.includes('en')) return -100;
  let s = 0;
  if (n.includes('neural') || n.includes('natural') || n.includes('online')) s += 40;
  for (const h of PASTOR_VOICE_HINTS) if (n.includes(h)) s += 25;
  if (n.includes('male') || n.includes('man')) s += 15;
  if (n.includes('female') || n.includes('woman') || n.includes('zira') || n.includes('samantha')) s -= 50;
  if (v.localService) s += 5;
  if (v.lang.toLowerCase().startsWith('en-us') || v.lang.toLowerCase().startsWith('en-gb')) s += 5;
  return s;
}

function pickPastorVoice(): SpeechSynthesisVoice | null {
  if (!window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  return [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] ?? null;
}

function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const existing = window.speechSynthesis?.getVoices() ?? [];
    if (existing.length) {
      resolve(existing);
      return;
    }
    const done = () => {
      window.speechSynthesis?.removeEventListener('voiceschanged', done);
      resolve(window.speechSynthesis?.getVoices() ?? []);
    };
    window.speechSynthesis?.addEventListener('voiceschanged', done);
    setTimeout(done, 600);
  });
}

function stopAll() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
  window.speechSynthesis?.cancel();
}

async function speakNeural(text: string): Promise<boolean> {
  try {
    const res = await fetch(NEURAL_TTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.slice(0, 2500) }),
    });
    if (!res.ok) return false;
    const blob = await res.blob();
    if (!blob.size || !(blob.type.includes('audio') || blob.type.includes('mpeg') || blob.type === '')) {
      // Some gateways omit type; still try if we got bytes
      if (blob.size < 1000) return false;
    }
    const url = URL.createObjectURL(blob);
    stopAll();
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      URL.revokeObjectURL(url);
      if (currentAudio === audio) currentAudio = null;
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      if (currentAudio === audio) currentAudio = null;
    };
    await audio.play();
    return true;
  } catch {
    return false;
  }
}

async function speakLocal(text: string) {
  await waitForVoices();
  stopAll();
  const voice = pickPastorVoice();
  // Speak in sentence chunks so pacing feels less robotic
  const chunks = text
    .split(/(?<=[.!?])\s+/)
    .map((c) => c.trim())
    .filter(Boolean);
  const parts = chunks.length ? chunks : [text];

  for (let i = 0; i < parts.length; i++) {
    await new Promise<void>((resolve) => {
      const u = new SpeechSynthesisUtterance(parts[i]);
      if (voice) u.voice = voice;
      u.rate = 0.84; // slower — pastoral
      u.pitch = 0.82; // deeper
      u.volume = 1;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      window.speechSynthesis.speak(u);
    });
    if (i < parts.length - 1) await new Promise((r) => setTimeout(r, 280));
  }
}

/** Speak prayer / Scripture in a deep middle-aged pastor tone. */
export async function speakPastor(text: string): Promise<void> {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return;
  const ok = await speakNeural(clean);
  if (!ok) await speakLocal(clean);
}

export function stopSpeaking() {
  stopAll();
}
