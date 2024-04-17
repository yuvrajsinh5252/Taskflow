import { GiNextButton, GiPauseButton, GiPlayButton, GiPreviousButton } from "react-icons/gi";
import { ControllerContext } from "../contexts/ControllerContext";
import React from "react";
import { ControllerContextType } from "../@types/Controller";

export default function Controller() {
  const { setStatus } = React.useContext(ControllerContext) as ControllerContextType;
  const [play, setPlay] = React.useState(false);

  return (
    <div className="controller-box">

      {/* TODO: add the speed control */}

      <div className="control">
        <GiPreviousButton onClick={() => setStatus("prev")} className="prev button" />
        {
          play ?
            <GiPauseButton onClick={() => { setStatus("paused"); setPlay(false) }} className="pause button" />
            :
            <GiPlayButton onClick={() => { setStatus("running"); setPlay(true) }} className="play button" />
        }
        <GiNextButton onClick={() => setStatus("next")} className="next button" />
      </div>
    </div >
  )
}