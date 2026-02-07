import Home from "./components/pages/Home"
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "120%",
          height: "120%",
          objectFit: "fill",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <NavBar />
      <Home />
    </>
  );
};

export default App;
