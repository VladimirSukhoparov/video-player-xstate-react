import { PlayCircleOutlined } from "@ant-design/icons";
import "./App.css";
import { useState } from "react";
import { ModalVideo } from "./components/ModalVideo";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="player_box">
        <PlayCircleOutlined
          style={{ fontSize: "50px", color: "#8585ff", cursor: "pointer" }}
          onClick={() => setOpen(true)}
        />
      </div>
      <ModalVideo open={open} setOpen={setOpen} />
    </>
  );
}

export default App;
