import {
  GiNextButton,
  GiPauseButton,
  GiPlayButton,
  GiPreviousButton,
} from "react-icons/gi";
import { ControllerContext } from "../contexts/ControllerContext";
import React, { useEffect } from "react";
import { ControllerContextType } from "../@types/Controller";

export default function Controller() {
  const { status, setStatus, speed, setSpeed } = React.useContext(
    ControllerContext
  ) as ControllerContextType;
  const [play, setPlay] = React.useState(false);

  useEffect(() => {
    if (status === "running") setPlay(true);
    else setPlay(false);
  }, [status]);

  return (
    <div className="controller-box">
      <div className="speed">
        <label htmlFor="speed">speed</label>
        <input
          type="range"
          id="slider"
          name="speed"
          min={1}
          max={100}
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
      </div>
      <div className="control">
        <GiPreviousButton
          onClick={() => setStatus("prev")}
          size={40}
          className="control_button"
        />
        {play ? (
          <GiPauseButton
            onClick={() => {
              setStatus("paused");
              setPlay(false);
            }}
            size={40}
            className="control_button"
          />
        ) : (
          <GiPlayButton
            onClick={() => {
              setStatus("running");
              setPlay(true);
            }}
            size={40}
            className="control_button"
          />
        )}
        <GiNextButton
          onClick={() => setStatus("next")}
          size={40}
          className="control_button"
        />
      </div>
    </div>
  );
}
