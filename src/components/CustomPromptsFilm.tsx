import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function CustomPromptsFilm({ locale = 'zh' }: { locale?: 'zh' | 'en' }) {
  const ref = useRef<HTMLVideoElement>(null);
  
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
    <div className="w-full mx-auto overflow-hidden sm:rounded-[2rem] shadow-2xl sm:ring-1 ring-black/10 bg-[#F2F2F7]">
      <div 
        className="relative aspect-video w-full group cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
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
          aria-label={isEn ? 'Keyly Custom Prompt Demo' : 'Keyly 自訂指令示範'}
        >
          <source src={`/videos/${basename}.webm`} type="video/webm" />
          <source src={`/videos/${basename}.mp4`} type="video/mp4" />
        </video>
        
        {/* 參考 mimic-website 的 FilmVideo：白色膠囊＋品牌色圓形圖示＋文字 */}
        <button
          type="button"
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-extrabold text-text-primary shadow-[0_10px_30px_rgba(15,23,42,.18)] ring-4 ring-transparent transition-shadow duration-200 hover:shadow-[0_12px_34px_rgba(15,23,42,.26)] focus-visible:outline-none focus-visible:ring-brand-cyan/40 cursor-pointer"
          aria-label={isPlaying ? pauseLabel : playLabel}
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-cyan text-white">
            {isPlaying ? (
              <Pause className="h-4 w-4" fill="currentColor" />
            ) : (
              <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
            )}
          </span>
          {isPlaying ? (isEn ? 'Pause' : '暫停') : (isEn ? 'Play' : '播放')}
        </button>
      </div>
    </div>
  );
}
