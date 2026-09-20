import type { Passage } from '../data/feelings';

export type PrayerStyle = 'short' | 'personal' | 'deep' | 'encouraging';

export function buildPrayer(opts: {
  feelingLabel: string;
  freeText?: string;
  passage: Passage;
  style: PrayerStyle;
}): string {
  const { feelingLabel, freeText, passage, style } = opts;
  const situation = freeText?.trim()
    ? `especially as I face this: "${freeText.trim()}"`
    : `as I feel ${feelingLabel.toLowerCase()}`;

  if (style === 'short') {
    return `Father God, I come to You ${situation}. Your Word says, "${passage.text}" (${passage.ref}). Help me trust You with what I cannot carry alone. Amen.`;
  }
  if (style === 'encouraging') {
    return `Lord, thank You that You see me ${situation}. I receive the comfort of ${passage.ref}: "${passage.text}" Steady my heart. Renew my hope. Teach me to walk one faithful step at a time. In Jesus' name, Amen.`;
  }
  if (style === 'deep') {
    return `Holy God, You know every hidden place in me ${situation}. Meet me in this. Speak through Your Word — ${passage.ref} — "${passage.text}" Soften what is hard, heal what is wounded, and guide what is confused. I cast my cares on You, because You care for me. Through Christ our Lord, Amen.`;
  }
  return `God, I'm being honest with You ${situation}. I'm holding onto ${passage.ref}: "${passage.text}" Please give me peace where I need peace, strength where I am weak, and wisdom for the next right thing. I trust that You are near. Amen.`;
}
