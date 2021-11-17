import React, { useEffect, useRef, useState } from "react";
import Styles from "./AudioWaveForm.module.css";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";

const AudioWaveForm = (props) => {
  // To monitor the state of the audio
  const [play, setPlay] = useState(false);

  const wavesurfer = useRef(null);

  const waveRef = useRef("");
  useEffect(() => {
    // passing options to create the WaveSurfer
    wavesurfer.current = WaveSurfer.create({
      container: waveRef.current, // reference to the container in which waveform needs to be displayed
      waveColor: "#A8DBA8",
      progressColor: "#3B8686",
      backend: "MediaElement",
      plugins: [
        RegionsPlugin.create({
          regionsMinLength: 2,
          regions: [
            {
              start: 5,
              end: 100,
              loop: false,
              color: "hsla(500, 70%, 30%, 0.5)",
            },
          ],
          dragSelection: {
            slop: 5,
          },
        }),
      ],
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
  const PlayRegionAction = () => {
    if (play) setPlay(false);
    else setPlay(true);
    const region = Object.values(wavesurfer.current.regions.list)[0];
    region.play();
  };

  return (
    <div>
      <div className={Styles.audioWave} ref={waveRef} />
      <div className={Styles.control}>
        <button className={Styles.button} onClick={PlayAction}>
          {play ? "Pause" : "Play"}
        </button>
        <button className={Styles.button2} onClick={PlayRegionAction}>
          Play the region
        </button>
      </div>
    </div>
  );
};

export default AudioWaveForm;
