import { useState, useRef } from "react";
import FaceExpression from "../FaceExpression";
import MoodSongs from "../MoodSongs";
import Player from"../Player";
import "./Home.css"
const App = () => {
  const [Songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  return (
    <div className="main-container">
      <FaceExpression setSongs={setSongs} />
      <MoodSongs 
        songs={Songs} 
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />
      <Player 
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />
    </div>
  );
};

export default App;
