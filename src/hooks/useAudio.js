import { useState, useRef, useEffect } from 'react';

// Um estado global simples fora do hook para garantir que apenas 1 áudio toque por vez.
let globalPlayingAudio = null;
let globalSetPlayingId = null;

export function useAudio(url, id) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGlobalPlaying, setIsGlobalPlaying] = useState(false);

  // Set the global reference function for the current component
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        if (globalPlayingAudio === audioRef.current) {
          globalPlayingAudio = null;
          if (globalSetPlayingId) globalSetPlayingId(null);
        }
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, [url]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (globalPlayingAudio === audioRef.current) {
        globalPlayingAudio = null;
        if (globalSetPlayingId) globalSetPlayingId(null);
      }
    } else {
      // Pause o global
      if (globalPlayingAudio && globalPlayingAudio !== audioRef.current) {
        globalPlayingAudio.pause();
        if (globalSetPlayingId) globalSetPlayingId(null);
      }
      
      // Toca o novo
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
      setIsPlaying(true);
      
      globalPlayingAudio = audioRef.current;
      globalSetPlayingId = (playingId) => setIsGlobalPlaying(playingId === id);
      if (globalSetPlayingId) globalSetPlayingId(id);
    }
  };

  // If this ID is the global playing, reflect the state
  useEffect(() => {
    if (globalPlayingAudio === audioRef.current) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isGlobalPlaying, id]);

  return { isPlaying, togglePlay };
}
