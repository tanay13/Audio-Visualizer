import React, { useEffect, useRef, useState } from "react";
import Styles from "./AudioWaveForm.module.css";
import WaveSurfer from "wavesurfer.js";

//setting type for the props we receive in this component
interface props {
  track: string;
}

const AudioWaveForm: React.FC<props> = (props) => {
  // To monitor the state of the audio
  const [play, setPlay] = useState(false);

  const wavesurfer = useRef(null) as any;

  // as any - because "container" and "ref" has two different types which gives error when assigned
  const waveRef = useRef("") as any;
  useEffect(() => {
    // passing options to create the WaveSurfer
    wavesurfer.current = WaveSurfer.create({
      container: waveRef.current, // reference to the container in which waveform needs to be displayed
      waveColor: "#A8DBA8",
      progressColor: "#3B8686",
    });

    // loads the track from the url
    wavesurfer.current.load(props.track);

    // Removes elements when component unmount
    return () => wavesurfer.current.destroy();
  }, [props.track]);

  // Audio State handler
  const PlayAction = () => {
    if (play) setPlay(false);
    else setPlay(true);
    wavesurfer.current.playPause();
  };

  return (
    <div>
      <div className={Styles.audioWave} ref={waveRef} />
      <div className={Styles.control}>
        <button className={Styles.button} onClick={PlayAction}>
          {play ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default AudioWaveForm;
