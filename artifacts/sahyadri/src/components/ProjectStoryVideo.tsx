import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

type ProjectStoryVideoProps = {
  src: string;
  title: string;
  subtitle: string;
  category: string;
  className?: string;
};

export function ProjectStoryVideo({
  src,
  title,
  subtitle,
  category,
  className = '',
}: ProjectStoryVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayHint, setShowPlayHint] = useState(true);

  const tryPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setIsPlaying(true);
      setShowPlayHint(false);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    video.muted = isMuted;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          void tryPlay();
        } else {
          pauseVideo();
        }
      },
      { threshold: [0, 0.4, 0.6] },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isMuted, tryPlay, pauseVideo]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
    if (!next && !isPlaying) void tryPlay();
  };

  const handleManualPlay = () => {
    void tryPlay();
  };

  return (
    <div
      ref={containerRef}
      className={`project-story-video w-full ${className}`}
    >
      <div className="relative w-full">
        <div className="absolute -inset-2 md:-inset-3 rounded-2xl md:rounded-3xl bg-gradient-to-r from-primary/25 via-primary/10 to-primary/25 blur-sm pointer-events-none" />
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border-4 border-white/70 shadow-2xl bg-black">
          <div className="absolute top-4 left-4 z-20 bg-black/65 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/20">
            {category}
          </div>

          <button
            type="button"
            onClick={toggleMute}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-colors duration-300"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Horizontal widescreen player */}
          <div className="relative aspect-video w-full bg-black">
            <video
              ref={videoRef}
              src={src}
              className="absolute inset-0 w-full h-full object-contain bg-black"
              playsInline
              muted
              loop
              preload="metadata"
              onPlay={() => {
                setIsPlaying(true);
                setShowPlayHint(false);
              }}
              onPause={() => setIsPlaying(false)}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

            {!isPlaying && (
              <button
                type="button"
                onClick={handleManualPlay}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/20 hover:bg-black/30 transition-colors"
                aria-label="Play video"
              >
                {showPlayHint && (
                  <>
                    <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-xl">
                      <Play size={28} className="ml-1" fill="currentColor" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/90">
                      Tap to Play
                    </span>
                  </>
                )}
              </button>
            )}

            <div className="absolute bottom-0 left-0 right-0 z-20 px-5 py-4 md:px-8 md:py-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-primary mb-1">
                {subtitle}
              </p>
              <h3 className="text-base sm:text-lg md:text-2xl font-display font-extrabold text-white leading-snug">
                {title}
              </h3>
            </div>
          </div>
        </div>

        <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-primary pointer-events-none hidden sm:block" />
        <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-primary pointer-events-none hidden sm:block" />
      </div>
    </div>
  );
}
