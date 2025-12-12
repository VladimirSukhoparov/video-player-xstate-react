import { Button, Modal } from "antd";
import {
  ArrowsAltOutlined,
  CaretRightOutlined,
  PauseOutlined,
  ShrinkOutlined,
} from "@ant-design/icons";
import { useState, type ReactNode } from "react";
import { VideoPlayer } from "./VideoPlayer";

interface ModalVideoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ModalVideo = ({ open, setOpen }: ModalVideoProps) => {
  const [paused, setPaused] = useState(false);

  const closeModal = () => {
    setOpen(false);
    setPaused(false);
  };
  const modalStyles = {
    header: {
      borderBottom: "1px solid #f0f0f0",
      borderRadius: "2px 2px 0 0",
      padding: "16px 24px",
      margin: 0,
      textTransform: "uppercase",
    },
    body: {
      padding: "24px",
    },
    footer: {
      borderTop: "1px solid #f0f0f0",
      borderRadius: "0 0 2px 2px",
      TextAlign: "right",
      margin: 0,
      padding: "10px 16px",
    },
    container:{
        padding:0,
    }
  };

  const footer: ReactNode = (
    <>
      <Button
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        <ArrowsAltOutlined />
      </Button>
      <Button
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        <ShrinkOutlined style={{ fontSize: "16px" }} />
      </Button>
      <Button
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={() => setPaused(!paused)}
      >
        {paused ? (
          <CaretRightOutlined style={{ fontSize: "16px" }} />
        ) : (
          <PauseOutlined style={{ fontSize: "16px" }} />
        )}
      </Button>
    </>
  );
  return (
    <Modal
      open={open}
      title="Video Player"
      footer={footer}
      width={1000}
      style={{ margin: "5vh auto auto" }}
      onCancel={closeModal}
      styles={modalStyles}
    >
      <div style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <VideoPlayer paused={paused} />
      </div>
    </Modal>
  );
};
