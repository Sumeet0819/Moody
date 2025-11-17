import React, { useState, useRef } from "react";
import "./MoodSongs.css"; // Import CSS file

const MoodSongs = ({ songs }) => {
  const [currentSong, setCurrentSong] = useState(null); 
  const audioRef = useRef(null); 

  const handlePlay = (songUrl, index) => {
    if (audioRef.current) {
      audioRef.current.pause(); 
    }
    const audio = new Audio(songUrl);
    audioRef.current = audio;
    audio.play();
    setCurrentSong(index);
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setCurrentSong(null);
    }
  };

  return (
    <div className="songs-container">
      <div className="songs-wrapper">
        <h2 className="songs-title">Recommended Songs</h2>

        {songs.length > 0 ? (
          songs.map((val, key) => (
            <div key={key} className="song-card">
              <div className="song-details">
                <h4>{val.title}</h4>
                <h4>{val.artist}</h4>
              </div>
              <div className="song-controls">
                <button
                  onClick={() => handlePlay(val.audio || "", key)}
                >
                  ▶ Play
                </button>
                <button onClick={handlePause}>
                  ⏸ Pause
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-songs">No songs available yet</p>
        )}
      </div>
    </div>
  );
};

export default MoodSongs;
