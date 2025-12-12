import { Button, Modal } from "antd";
import {
  ArrowsAltOutlined,
  CaretRightOutlined,
  PauseOutlined,
  ShrinkOutlined,
} from "@ant-design/icons";
import { type ReactNode } from "react";
import { VideoPlayer } from "./VideoPlayer";
import type { VideoEvent } from "../machines/videoMachine";

interface ModalVideoProps {
  state: "playing" | "paused" | "closed";
  width: "default" | "mini";
  send: (event: VideoEvent) => void;
}

export const ModalVideo = ({ state, width, send }: ModalVideoProps) => {
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
    container: {
      padding: 0,
    },
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
        onClick={() =>
          send({
            type: "SET_WIDTH",
            width: width === "mini" ? "default" : "mini",
          })
        }
      >
        {width === "mini" ? (
          <ArrowsAltOutlined style={{ fontSize: "16px" }} />
        ) : (
          <ShrinkOutlined style={{ fontSize: "16px" }} />
        )}
      </Button>
      <Button
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={() => send({ type: "TOGGLE_PAUSE" })}
      >
        {state === "paused" ? (
          <CaretRightOutlined style={{ fontSize: "16px" }} />
        ) : (
          <PauseOutlined style={{ fontSize: "16px" }} />
        )}
      </Button>
    </>
  );
  return (
    <Modal
      open={state !== "closed"}
      title="Video Player"
      footer={footer}
      centered
      width={width === "mini" ? 500 : 1000}
      onCancel={() => {
        if (state !== "paused") send({ type: "TOGGLE_PAUSE" });
        setTimeout(() => send({ type: "CLOSE" }), 0);
      }}
      styles={modalStyles}
    >
      <div style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <VideoPlayer state={state} />
      </div>
    </Modal>
  );
};
