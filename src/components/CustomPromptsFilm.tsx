import { useEffect, useRef, useState } from 'react';

export default function CustomPromptsFilm({ locale = 'zh' }: { locale?: 'zh' | 'en' }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduceMotion(mediaQuery.matches);
      
      const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);
  
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    
    if (reduceMotion) {
      video.pause();
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [reduceMotion]);

  const basename = locale === 'en' ? 'custom-en' : 'custom-zh';

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative [--s:0.56] sm:[--s:0.62] lg:[--s:0.75] overflow-hidden rounded-[calc(2.5rem*var(--s))] sm:rounded-[calc(2.8rem*var(--s))] shadow-2xl ring-[calc(1px/var(--s))] ring-black/10 bg-[#F2F2F7]"
        style={{ width: 'calc(456px * var(--s))', height: 'calc(972px * var(--s))' }} 
        role="img" 
        aria-label={locale === 'en' ? 'Keyly Custom Prompt Demo' : 'Keyly 自訂指令示範'}
      >
        <video 
          ref={ref}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay={!reduceMotion}
          muted 
          loop 
          playsInline 
          preload="metadata" 
          poster={`/videos/${basename}.jpg`}
        >
          <source src={`/videos/${basename}.webm`} type="video/webm" />
          <source src={`/videos/${basename}.mp4`} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
