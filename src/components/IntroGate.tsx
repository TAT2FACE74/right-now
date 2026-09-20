import { useEffect, useRef, useState, type ReactNode } from 'react';

const SESSION_KEY = 'epray-intro-seen';

type Props = { children: ReactNode };

export function IntroGate({ children }: Props) {
  const [show, setShow] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== '1';
    } catch {
      return true;
    }
  });
  const [needsTap, setNeedsTap] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    const p = v.play();
    if (p && typeof p.then === 'function') {
      p.catch(() => {
        // Autoplay with sound blocked — mute + play, or ask for tap
        v.muted = true;
        v.play().catch(() => setNeedsTap(true));
        setNeedsTap(true);
      });
    }
  }, [show]);

  function finish() {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  function startWithSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    void v.play().then(() => setNeedsTap(false)).catch(() => {
      v.muted = true;
      void v.play();
      setNeedsTap(false);
    });
  }

  if (!show) return <>{children}</>;

  const src = `${import.meta.env.BASE_URL}intro.mp4`;

  return (
    <div className="intro-gate" role="dialog" aria-label="E*PRAY intro">
      <video
        ref={videoRef}
        className="intro-video"
        src={src}
        playsInline
        preload="auto"
        onEnded={finish}
      />
      {needsTap && (
        <button type="button" className="intro-tap" onClick={startWithSound}>
          Tap to begin
        </button>
      )}
      <button type="button" className="intro-skip" onClick={finish}>
        Skip
      </button>
    </div>
  );
}
