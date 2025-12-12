import { PlayCircleOutlined } from "@ant-design/icons";
import "./App.css";
import { ModalVideo } from "./components/ModalVideo";
import { useVideoMachine } from "./machines/useVideoMachine";

function App() {
  const { isClosed, isPlaying, width, send } = useVideoMachine();
  
  const modalState = isClosed ? "closed" : isPlaying ? "playing" : "paused";
  
  return (
    <>
      <div className="player_box">
        <PlayCircleOutlined
          style={{ fontSize: "50px", color: "#8585ff", cursor: "pointer" }}
          onClick={() => send({ type: "OPEN" })}
        />
      </div>
      <ModalVideo
        state={modalState}
        width={width}
        send={send}
      />
    </>
  );
}

export default App;