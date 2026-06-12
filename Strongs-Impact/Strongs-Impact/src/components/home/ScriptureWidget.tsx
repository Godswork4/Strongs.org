import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Copy, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface Scripture {
  verse: string;
  text: string;
  reference: string;
  image: string;
}

const scriptures: Scripture[] = [
  {
    verse: 'Isaiah 40:31',
    text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
    reference: 'KJV',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  },
  {
    verse: 'Proverbs 3:5-6',
    text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
    reference: 'KJV',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80',
  },
  {
    verse: 'Philippians 4:13',
    text: 'I can do all things through Christ which strengtheneth me.',
    reference: 'KJV',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
  },
  {
    verse: 'Romans 8:28',
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
    reference: 'KJV',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=80',
  },
  {
    verse: 'Jeremiah 29:11',
    text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
    reference: 'KJV',
    image: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?w=1920&q=80',
  },
  {
    verse: 'Psalm 23:1',
    text: 'The LORD is my shepherd; I shall not want.',
    reference: 'KJV',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
  },
  {
    verse: 'John 3:16',
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    reference: 'KJV',
    image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1920&q=80',
  },
  {
    verse: 'Matthew 11:28',
    text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
    reference: 'KJV',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
  },
  {
    verse: 'Psalm 46:10',
    text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.',
    reference: 'KJV',
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1920&q=80',
  },
  {
    verse: 'Galatians 5:22-23',
    text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law.',
    reference: 'KJV',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80',
  },
];

const AUTO_INTERVAL = 8000;

const ScriptureWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((index: number) => {
    setIsVisible(false);
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsVisible(true);
    }, 350);
  }, []);

  const next = useCallback(() => {
    goTo((currentIndex + 1) % scriptures.length);
  }, [currentIndex, goTo]);

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + scriptures.length) % scriptures.length);
  }, [currentIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  useEffect(() => {
    if (isPaused) return;
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / AUTO_INTERVAL) * 100, 100));
    }, 50);
    return () => clearInterval(tick);
  }, [currentIndex, isPaused]);

  const handleCopy = () => {
    const { verse, text } = scriptures[currentIndex];
    navigator.clipboard.writeText(`"${text}" — ${verse}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const current = scriptures[currentIndex];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '480px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background image — no colour tint, just a consistent dark scrim */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url('${current.image}')` }}
      />
      {/* Uniform dark overlay — always 80% opacity so text is always readable */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 md:py-28 transition-opacity duration-300"
        style={{ minHeight: '480px', opacity: isVisible ? 1 : 0 }}
      >
        {/* Label */}
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-4 w-4 text-white/60" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60">
            Daily Scripture
          </span>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-white/30 mb-8" />

        {/* Verse text */}
        <blockquote className="max-w-2xl text-white text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed mb-8">
          &ldquo;{current.text}&rdquo;
        </blockquote>

        {/* Reference */}
        <p className="text-white/70 text-sm font-medium tracking-wide mb-10">
          — {current.verse} &nbsp;·&nbsp; {current.reference}
        </p>

        {/* Nav controls */}
        <div className="flex items-center gap-5 mb-8">
          <button
            onClick={prev}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white/70 hover:border-white hover:text-white transition-all"
            aria-label="Previous verse"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {scriptures.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Verse ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-5 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white/70 hover:border-white hover:text-white transition-all"
            aria-label="Next verse"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/25 text-white/70 hover:border-white/60 hover:text-white text-sm transition-all"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy Verse
            </>
          )}
        </button>
      </div>

      {/* Progress bar — always white, thin, consistent */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10">
        <div
          className="h-full bg-white/50 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
};

export default ScriptureWidget;
