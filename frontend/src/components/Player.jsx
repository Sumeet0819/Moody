import React, { useState } from "react";
import "./Player.css";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player-fixed-bar">
      <div className="player-glass-wrapper">
        
        {/* LEFT: Album Art & Info */}
        <div className="player-left">
          <img 
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop" 
            alt="Album Art" 
            className="bar-album-art"
          />
          <div className="bar-song-info">
            <div className="bar-title">Neon Nights</div>
            <div className="bar-artist">The Cyberpunks</div>
          </div>
        </div>

        {/* CENTER: Controls & Progress */}
        <div className="player-center">
          <div className="bar-controls">
            <button className="bar-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg></button>
            
            <button className={`bar-play-btn ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              )}
            </button>

            <button className="bar-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg></button>
          </div>
          
          <div className="bar-progress-container">
            <span className="time">1:45</span>
            <div className="bar-progress-bg">
              <div className="bar-progress-fill" style={{width: '45%'}}></div>
            </div>
            <span className="time">3:30</span>
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