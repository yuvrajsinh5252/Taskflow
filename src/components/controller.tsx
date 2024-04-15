import { GiNextButton, GiPlayButton, GiPreviousButton } from "react-icons/gi";

export default function Controller() {
  return (
    <div className="controller-box">

      {/* TODO: add the speed control */}

      <div className="control">
        <GiPreviousButton className="prev button" />
        <GiPlayButton className="play button" />
        <GiNextButton className="next button" />
      </div>
    </div >
  )
}