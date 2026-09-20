export type FeelingId =
  | 'peaceful' | 'happy' | 'grateful' | 'loved' | 'anxious' | 'worried'
  | 'sad' | 'lonely' | 'angry' | 'hurt' | 'afraid' | 'confused'
  | 'exhausted' | 'tempted' | 'discouraged' | 'lost' | 'hopeful'
  | 'motivated' | 'overwhelmed' | 'forgiving' | 'needing_strength' | 'needing_guidance';

export type Feeling = { id: FeelingId; label: string; emoji: string };

export const FEELINGS: Feeling[] = [
  { id: 'peaceful', label: 'Peaceful', emoji: '🕊️' },
  { id: 'happy', label: 'Happy', emoji: '☀️' },
  { id: 'grateful', label: 'Grateful', emoji: '🙌' },
  { id: 'loved', label: 'Loved', emoji: '❤️' },
  { id: 'anxious', label: 'Anxious', emoji: '💭' },
  { id: 'worried', label: 'Worried', emoji: '🌧️' },
  { id: 'sad', label: 'Sad', emoji: '💧' },
  { id: 'lonely', label: 'Lonely', emoji: '🌑' },
  { id: 'angry', label: 'Angry', emoji: '🔥' },
  { id: 'hurt', label: 'Hurt', emoji: '💔' },
  { id: 'afraid', label: 'Afraid', emoji: '🛡️' },
  { id: 'confused', label: 'Confused', emoji: '🌫️' },
  { id: 'exhausted', label: 'Exhausted', emoji: '😮‍💨' },
  { id: 'tempted', label: 'Tempted', emoji: '⚔️' },
  { id: 'discouraged', label: 'Discouraged', emoji: '🪨' },
  { id: 'lost', label: 'Lost', emoji: '🧭' },
  { id: 'hopeful', label: 'Hopeful', emoji: '🌅' },
  { id: 'motivated', label: 'Motivated', emoji: '✨' },
  { id: 'overwhelmed', label: 'Overwhelmed', emoji: '🌊' },
  { id: 'forgiving', label: 'Forgiving', emoji: '🤝' },
  { id: 'needing_strength', label: 'Needing strength', emoji: '💪' },
  { id: 'needing_guidance', label: 'Needing guidance', emoji: '🕯️' },
];

export type Passage = {
  ref: string;
  book: string;
  chapter: number;
  verse: string;
  text: string;
  translation: 'KJV';
  why: string;
};

/** Curated public-domain KJV passages for Phase 1 emotion matching. */
export const PASSAGES_BY_FEELING: Record<FeelingId, Passage[]> = {
  peaceful: [
    { ref: 'John 14:27', book: 'John', chapter: 14, verse: '27', translation: 'KJV',
      text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.',
      why: 'This passage may offer encouragement when you long for a peace deeper than circumstances.' },
    { ref: 'Philippians 4:7', book: 'Philippians', chapter: 4, verse: '7', translation: 'KJV',
      text: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
      why: 'Scripture points to a guarding peace that can steady mind and heart.' },
  ],
  happy: [
    { ref: 'Psalm 118:24', book: 'Psalm', chapter: 118, verse: '24', translation: 'KJV',
      text: 'This is the day which the LORD hath made; we will rejoice and be glad in it.',
      why: 'A simple invitation to receive joy as a gift for today.' },
    { ref: 'Nehemiah 8:10', book: 'Nehemiah', chapter: 8, verse: '10', translation: 'KJV',
      text: '...for the joy of the LORD is your strength.',
      why: 'Joy rooted in God can become strength for what comes next.' },
  ],
  grateful: [
    { ref: '1 Thessalonians 5:18', book: '1 Thessalonians', chapter: 5, verse: '18', translation: 'KJV',
      text: 'In every thing give thanks: for this is the will of God in Christ Jesus concerning you.',
      why: 'Gratitude is framed here as a way of walking with God in every season.' },
    { ref: 'Psalm 100:4', book: 'Psalm', chapter: 100, verse: '4', translation: 'KJV',
      text: 'Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.',
      why: 'Thanksgiving opens the door to worship and remembrance.' },
  ],
  loved: [
    { ref: 'Romans 8:38-39', book: 'Romans', chapter: 8, verse: '38-39', translation: 'KJV',
      text: 'For I am persuaded, that neither death, nor life... nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.',
      why: 'This passage may speak to a love that holds when everything else shifts.' },
    { ref: '1 John 4:19', book: '1 John', chapter: 4, verse: '19', translation: 'KJV',
      text: 'We love him, because he first loved us.',
      why: 'Love begins with God\'s initiative toward us.' },
  ],
  anxious: [
    { ref: '1 Peter 5:7', book: '1 Peter', chapter: 5, verse: '7', translation: 'KJV',
      text: 'Casting all your care upon him; for he careth for you.',
      why: 'This verse may offer encouragement for anxiety you are carrying right now.' },
    { ref: 'Philippians 4:6', book: 'Philippians', chapter: 4, verse: '6', translation: 'KJV',
      text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
      why: 'Scripture invites prayer instead of silent worry.' },
  ],
  worried: [
    { ref: 'Matthew 6:34', book: 'Matthew', chapter: 6, verse: '34', translation: 'KJV',
      text: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.',
      why: 'Jesus\' teaching may help you hold today without borrowing tomorrow\'s weight.' },
    { ref: 'Isaiah 41:10', book: 'Isaiah', chapter: 41, verse: '10', translation: 'KJV',
      text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
      why: 'A promise of presence and help when worry rises.' },
  ],
  sad: [
    { ref: 'Psalm 34:18', book: 'Psalm', chapter: 34, verse: '18', translation: 'KJV',
      text: 'The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.',
      why: 'God is described as near to the brokenhearted — not distant from sorrow.' },
    { ref: 'Matthew 5:4', book: 'Matthew', chapter: 5, verse: '4', translation: 'KJV',
      text: 'Blessed are they that mourn: for they shall be comforted.',
      why: 'Mourning is met with a promise of comfort.' },
  ],
  lonely: [
    { ref: 'Deuteronomy 31:6', book: 'Deuteronomy', chapter: 31, verse: '6', translation: 'KJV',
      text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.',
      why: 'This passage may speak into loneliness with the assurance of God\'s nearness.' },
    { ref: 'Psalm 23:4', book: 'Psalm', chapter: 23, verse: '4', translation: 'KJV',
      text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
      why: 'Even in shadowed places, Scripture names God as present.' },
  ],
  angry: [
    { ref: 'Ephesians 4:26', book: 'Ephesians', chapter: 4, verse: '26', translation: 'KJV',
      text: 'Be ye angry, and sin not: let not the sun go down upon your wrath.',
      why: 'Anger is acknowledged, but not left to rule the night.' },
    { ref: 'James 1:19-20', book: 'James', chapter: 1, verse: '19-20', translation: 'KJV',
      text: 'Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath: For the wrath of man worketh not the righteousness of God.',
      why: 'A call toward listening and patience when heat rises.' },
  ],
  hurt: [
    { ref: 'Psalm 147:3', book: 'Psalm', chapter: 147, verse: '3', translation: 'KJV',
      text: 'He healeth the broken in heart, and bindeth up their wounds.',
      why: 'God is pictured as One who tends wounds — carefully, personally.' },
    { ref: 'Isaiah 53:4', book: 'Isaiah', chapter: 53, verse: '4', translation: 'KJV',
      text: 'Surely he hath borne our griefs, and carried our sorrows...',
      why: 'Scripture shows a Savior acquainted with grief, not indifferent to it.' },
  ],
  afraid: [
    { ref: '2 Timothy 1:7', book: '2 Timothy', chapter: 1, verse: '7', translation: 'KJV',
      text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
      why: 'Fear does not have to define the spirit God gives.' },
    { ref: 'Psalm 56:3', book: 'Psalm', chapter: 56, verse: '3', translation: 'KJV',
      text: 'What time I am afraid, I will trust in thee.',
      why: 'Trust can begin in the same moment fear appears.' },
  ],
  confused: [
    { ref: 'Proverbs 3:5-6', book: 'Proverbs', chapter: 3, verse: '5-6', translation: 'KJV',
      text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
      why: 'When understanding feels thin, Scripture invites trust and acknowledgment of God.' },
    { ref: 'James 1:5', book: 'James', chapter: 1, verse: '5', translation: 'KJV',
      text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.',
      why: 'Wisdom is something you can ask for without shame.' },
  ],
  exhausted: [
    { ref: 'Matthew 11:28', book: 'Matthew', chapter: 11, verse: '28', translation: 'KJV',
      text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
      why: 'Jesus invites the weary — rest is offered, not earned.' },
    { ref: 'Isaiah 40:31', book: 'Isaiah', chapter: 40, verse: '31', translation: 'KJV',
      text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles...',
      why: 'Waiting on God is linked with renewed strength.' },
  ],
  tempted: [
    { ref: '1 Corinthians 10:13', book: '1 Corinthians', chapter: 10, verse: '13', translation: 'KJV',
      text: 'There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able...',
      why: 'Temptation is common — and God\'s faithfulness is named as real help.' },
    { ref: 'Hebrews 4:15-16', book: 'Hebrews', chapter: 4, verse: '15-16', translation: 'KJV',
      text: 'For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin. Let us therefore come boldly unto the throne of grace...',
      why: 'You are not alone in temptation; grace is approachable.' },
  ],
  discouraged: [
    { ref: 'Galatians 6:9', book: 'Galatians', chapter: 6, verse: '9', translation: 'KJV',
      text: 'And let us not be weary in well doing: for in due season we shall reap, if we faint not.',
      why: 'A word against quitting when the harvest feels delayed.' },
    { ref: 'Joshua 1:9', book: 'Joshua', chapter: 1, verse: '9', translation: 'KJV',
      text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
      why: 'Courage is tied to God\'s presence on the road.' },
  ],
  lost: [
    { ref: 'Luke 15:4', book: 'Luke', chapter: 15, verse: '4', translation: 'KJV',
      text: 'What man of you, having an hundred sheep, if he lose one of them, doth not leave the ninety and nine in the wilderness, and go after that which is lost, until he find it?',
      why: 'Jesus pictures a God who pursues the one who feels lost.' },
    { ref: 'Psalm 119:105', book: 'Psalm', chapter: 119, verse: '105', translation: 'KJV',
      text: 'Thy word is a lamp unto my feet, and a light unto my path.',
      why: 'Scripture can give the next step even when the whole path is unclear.' },
  ],
  hopeful: [
    { ref: 'Romans 15:13', book: 'Romans', chapter: 15, verse: '13', translation: 'KJV',
      text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.',
      why: 'Hope is named as something God can fill and multiply.' },
    { ref: 'Jeremiah 29:11', book: 'Jeremiah', chapter: 29, verse: '11', translation: 'KJV',
      text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
      why: 'In context of exile, God speaks peace and a future — not abandonment.' },
  ],
  motivated: [
    { ref: 'Colossians 3:23', book: 'Colossians', chapter: 3, verse: '23', translation: 'KJV',
      text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.',
      why: 'Work done unto God can carry purpose beyond applause.' },
    { ref: 'Philippians 4:13', book: 'Philippians', chapter: 4, verse: '13', translation: 'KJV',
      text: 'I can do all things through Christ which strengtheneth me.',
      why: 'Strength for the task is located in Christ, not self alone.' },
  ],
  overwhelmed: [
    { ref: 'Psalm 61:2', book: 'Psalm', chapter: 61, verse: '2', translation: 'KJV',
      text: 'From the end of the earth will I cry unto thee, when my heart is overwhelmed: lead me to the rock that is higher than I.',
      why: 'Overwhelm can become a cry for higher ground.' },
    { ref: 'Psalm 46:1', book: 'Psalm', chapter: 46, verse: '1', translation: 'KJV',
      text: 'God is our refuge and strength, a very present help in trouble.',
      why: 'Help is described as present — not postponed.' },
  ],
  forgiving: [
    { ref: 'Ephesians 4:32', book: 'Ephesians', chapter: 4, verse: '32', translation: 'KJV',
      text: 'And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\'s sake hath forgiven you.',
      why: 'Forgiveness is rooted in how God has forgiven us.' },
    { ref: 'Matthew 6:14', book: 'Matthew', chapter: 6, verse: '14', translation: 'KJV',
      text: 'For if ye forgive men their trespasses, your heavenly Father will also forgive you.',
      why: 'Jesus connects forgiving others with living under the Father\'s forgiveness.' },
  ],
  needing_strength: [
    { ref: 'Psalm 28:7', book: 'Psalm', chapter: 28, verse: '7', translation: 'KJV',
      text: 'The LORD is my strength and my shield; my heart trusted in him, and I am helped...',
      why: 'Strength and help are found in trust, not grit alone.' },
    { ref: 'Isaiah 41:10', book: 'Isaiah', chapter: 41, verse: '10', translation: 'KJV',
      text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
      why: 'God speaks strength, help, and upholding into fear.' },
  ],
  needing_guidance: [
    { ref: 'Psalm 32:8', book: 'Psalm', chapter: 32, verse: '8', translation: 'KJV',
      text: 'I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.',
      why: 'Guidance is offered as instruction and careful watching.' },
    { ref: 'Proverbs 3:5-6', book: 'Proverbs', chapter: 3, verse: '5-6', translation: 'KJV',
      text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
      why: 'Direction follows trust and acknowledging God in your ways.' },
  ],
};

export function matchFeelingFromText(text: string): FeelingId {
  const t = text.toLowerCase();
  const rules: [RegExp, FeelingId][] = [
    [/anxi|panic|stress/, 'anxious'],
    [/worr/, 'worried'],
    [/sad|depress|cry|grief/, 'sad'],
    [/lone|alone|isolat/, 'lonely'],
    [/anger|angry|mad|rage/, 'angry'],
    [/hurt|betray|wound/, 'hurt'],
    [/afraid|fear|scar/, 'afraid'],
    [/confus|lost|direction/, 'lost'],
    [/tired|exhaust|burn/, 'exhausted'],
    [/tempt|addict|urge/, 'tempted'],
    [/discourag|hopeless|give up/, 'discouraged'],
    [/overwhel/, 'overwhelmed'],
    [/forgiv/, 'forgiving'],
    [/money|financ|job|work/, 'needing_strength'],
    [/guid|wisdom|decid|choice/, 'needing_guidance'],
    [/hope/, 'hopeful'],
    [/grateful|thank/, 'grateful'],
    [/peace/, 'peaceful'],
  ];
  for (const [re, id] of rules) if (re.test(t)) return id;
  return 'needing_guidance';
}

