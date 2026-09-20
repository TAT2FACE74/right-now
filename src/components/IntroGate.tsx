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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;
    // Browsers allow muted autoplay; start muted so it always plays with no tap gate
    v.muted = true;
    v.defaultMuted = true;
    void v.play().catch(() => {
      /* if play still fails, Skip remains available */
    });
  }, [show]);

  function finish() {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    setShow(false);
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
        muted
        autoPlay
        preload="auto"
        onEnded={finish}
      />
      <button type="button" className="intro-skip" onClick={finish}>
        Skip
      </button>
    </div>
  );
}
