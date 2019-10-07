import random from "./utils/random";

import PitchDetector from "./modules/pitch-detector";
import MusicGenerator from "./modules/music-generator";
import SheetRenderer from "./modules/sheet-renderer";
import BeatManager from "./modules/beat-manager";
import SoundManager from "./modules/sound-manager";
import SpawnManager from "./modules/spawn-manager";

import chord1 from "../assets/audio/chord1";
import chord2 from "../assets/audio/chord2";
import chord5 from "../assets/audio/chord5";

const globalStyles = `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden; 
  background-color: #266353; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  margin: 0;
`;

export function initializeAudioAnalizer(stream) {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;

  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  const frequencyData = new Uint8Array(analyser.frequencyBinCount);

  // Game initialization
  // ---------------------------------------------------------------------------
  const seededRandom = random("thisissparta");
  document.body.setAttribute("style", globalStyles);

  const chords = [chord1, chord2, chord5];
  const pitchManager = PitchDetector();
  const musicGenerator = MusicGenerator(chords, seededRandom.randomIntRange);
  const sheet = musicGenerator.generateSheet({
    chordProgression: [2, 5, 1, 2],
    barsPerChord: 4,
    cycles: 2
  });
  const sheetRenderer = SheetRenderer(sheet);
  const beatManager = BeatManager(sheet, sheetRenderer.element);
  const soundManager = SoundManager(sheet, chords);
  SpawnManager(
    sheetRenderer.element,
    pitchManager.element,
    beatManager.score,
    seededRandom
  );
  // ---------------------------------------------------------------------------

  let lastTime = performance.now();
  (function tick(current: number) {
    const deltaTime = (current - lastTime) / 1000;

    analyser.getByteFrequencyData(frequencyData);

    const activeKey = pitchManager.update(frequencyData);
    beatManager.update(deltaTime, activeKey);
    soundManager.update(deltaTime);

    requestAnimationFrame(tick);

    lastTime = current;
  })(lastTime);
}

window.onload = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function(stream) {
      initializeAudioAnalizer(stream);
    })
    .catch(function(err) {
      console.error(err);
    });
};
