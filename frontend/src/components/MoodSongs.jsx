import React from "react";
import "./MoodSongs.css"; // Import CSS file

const MoodSongs = ({ songs, currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef }) => {

  const handlePlay = (song, index) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(song.audio);
    audioRef.current = audio;
    audio.play();
    setCurrentSong({ ...song, index });
    setIsPlaying(true);

    // Handle when song ends
    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="songs-container">
      <div className="songs-wrapper">
        <h2 className="songs-title">Recommended Songs</h2>

        <div className="songs-list">
          {songs.length > 0 ? (
            songs.map((val, key) => (
              <div key={key} className={`song-card ${currentSong?.index === key ? 'active' : ''}`}>
                <div className="song-details">
                  <h4>{val.title}</h4>
                  <h4>{val.artist}</h4>
                </div>
                <div className="song-controls">
                  {currentSong?.index === key && isPlaying ? (
                    <button onClick={handlePause}>
                      ⏸ Pause
                    </button>
                  ) : (
                    <button onClick={() => handlePlay(val, key)}>
                      ▶ Play
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-songs">No songs available yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodSongs;
