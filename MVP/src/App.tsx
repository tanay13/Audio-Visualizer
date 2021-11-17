import React from "react";

import "./App.css";
import AudioWaveForm from "./components/AudioWaveForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>AUDIO VISUALIZER</h1>

      {/* Passing track props in AudioWaveForm component */}
      <AudioWaveForm track="https://www.mfiles.co.uk/mp3-downloads/beethoven-symphony7-2-medium-piano.mp3"></AudioWaveForm>
    </div>
  );
};

export default App;
