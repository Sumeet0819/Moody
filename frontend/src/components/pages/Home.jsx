import { useState } from "react";
import FaceExpression from "../FaceExpression";
import MoodSongs from "../MoodSongs";
import Player from"../Player";
import "./Home.css"
const App = () => {
  const [Songs, setSongs] = useState([]);

  return (
    <div className="main-container">
      <div className="top-container">
      <FaceExpression setSongs={setSongs} />
      <MoodSongs songs={Songs} />
      </div>
      <Player/>
    </div>
  );
};

export default App;
