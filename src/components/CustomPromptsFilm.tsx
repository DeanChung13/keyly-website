import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function CustomPromptsFilm({ locale = 'zh' }: { locale?: 'zh' | 'en' }) {
  const ref = useRef<HTMLVideoElement>(null);
  
  // We initialize the media query explicitly to get the correct initial state before hydration issues if possible,
  // but for SSR safety, we can initialize to false and update on mount.
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduceMotion(mediaQuery.matches);
      setIsPlaying(!mediaQuery.matches);
      
      const listener = (e: MediaQueryListEvent) => {
        setReduceMotion(e.matches);
        setIsPlaying(!e.matches);
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);
  
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play might be blocked by browser
          setIsPlaying(false);
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const basename = locale === 'en' ? 'custom-en' : 'custom-zh';
  const isEn = locale === 'en';
  const playLabel = isEn ? 'Play video' : '播放影片';
  const pauseLabel = isEn ? 'Pause video' : '暫停影片';

  return (
    <div className="w-full mx-auto overflow-hidden sm:rounded-[2rem] shadow-2xl ring-1 ring-black/10 bg-[#F2F2F7]">
      <div 
        className="relative aspect-video w-full group cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <video 
          ref={ref}
          className="absolute top-0 left-0 w-full h-full object-cover"
          muted 
          loop 
          playsInline 
          preload="metadata" 
          poster={`/videos/${basename}.jpg`}
          aria-label={isEn ? 'Keyly Custom Prompt Demo' : 'Keyly 自訂指令示範'}
        >
          <source src={`/videos/${basename}.webm`} type="video/webm" />
          <source src={`/videos/${basename}.mp4`} type="video/mp4" />
        </video>
        
        <button 
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          aria-label={isPlaying ? pauseLabel : playLabel}
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}
