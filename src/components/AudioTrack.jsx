import { useAudio } from '../hooks/useAudio';

export function AudioTrack({ number, imageSrc, title, subtitle, duration, isFavorite, url, id, buttonId }) {
  const { isPlaying, togglePlay } = useAudio(url, id);

  return (
    <div 
      id={buttonId}
      className="flex items-center gap-md p-md glass-card rounded-xl group hover:bg-white/10 transition-colors cursor-pointer"
      onClick={togglePlay}
    >
      <div className="font-headline-sm text-white/30 group-hover:text-[#1DB954]">
        {isPlaying ? (
          <span className="material-symbols-outlined text-[#1DB954]" style={{ fontVariationSettings: "'FILL' 1" }}>
            equalizer
          </span>
        ) : (
          number
        )}
      </div>
      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 relative">
        <img className="w-full h-full object-cover" src={imageSrc} alt="" />
        {isPlaying && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="material-symbols-outlined text-white">pause</span>
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className={`font-headline-sm text-[18px] ${isPlaying ? 'text-[#1DB954]' : 'text-white'}`}>{title}</div>
        <div className="text-on-surface-variant">{subtitle}</div>
      </div>
      <div className="hidden md:block text-white/40 font-label-caps">{duration}</div>
      <span 
        className={`material-symbols-outlined ${isFavorite ? 'text-[#1DB954]' : 'text-white/20'}`} 
        style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
      >
        favorite
      </span>
    </div>
  );
}
