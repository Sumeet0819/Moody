import React, { useState, useEffect } from "react";
import "./Player.css";

const Player = ({ currentSong, isPlaying, setIsPlaying, audioRef }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioRef.current]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current) return;
    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player-fixed-bar">
      <div className="player-glass-wrapper">
        
        {/* LEFT: Album Art & Info */}
        <div className="player-left">
          <img 
            src={currentSong?.image || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop"} 
            alt="Album Art" 
            className="bar-album-art"
          />
          <div className="bar-song-info">
            <div className="bar-title">{currentSong?.title || "No Song Playing"}</div>
            <div className="bar-artist">{currentSong?.artist || "Select a song"}</div>
          </div>
        </div>

        {/* CENTER: Controls & Progress */}
        <div className="player-center">
          <div className="bar-controls">
            <button className="bar-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg></button>
            
            <button 
              className={`bar-play-btn ${isPlaying ? 'playing' : ''}`} 
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              )}
            </button>

            <button className="bar-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg></button>
          </div>
          
          <div className="bar-progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <div className="bar-progress-bg" onClick={handleProgressClick}>
              <div className="bar-progress-fill" style={{width: `${progressPercentage}%`}}></div>
            </div>
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>

        {/* RIGHT: Volume / Extra */}
        <div className="player-right">
           <button className="bar-btn opacity-50">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
           </button>
        </div>

      </div>
    </div>
  );
};

export default Player;