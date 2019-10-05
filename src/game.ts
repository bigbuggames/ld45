import random from "./utils/random";

import PitchDetector from "./modules/pitch-detector";
import MusicGenerator from "./modules/music-generator";
import SheetRenderer from "./modules/sheet-renderer";
import BeatManager from "./modules/beat-manager";

import bars from "./data/bars";

export function initializeAudioAnalizer(stream) {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;

  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  const seededRandom = random("thisissparta");

  document.body.setAttribute("style", "overflow: hidden;");

  const pitchManager = PitchDetector();
  const musicGenerator = MusicGenerator(bars, seededRandom.randomIntRange);

  const sheet = musicGenerator.generateSheet({
    chordProgression: [2, 5, 1],
    barsPerChord: 4,
    cycles: 10
  });

  const sheetRenderer = SheetRenderer(sheet);
  const beatManager = BeatManager(sheet, sheetRenderer.element);

  let lastTime = performance.now();
  (function tick(current: number) {
    const deltaTime = (current - lastTime) / 1000;

    analyser.getByteFrequencyData(frequencyData);

    const activeKey = pitchManager.update(frequencyData);
    beatManager.update(deltaTime, activeKey);

    requestAnimationFrame(tick);

    lastTime = current;
  })(lastTime);
}

// function game() {
//   let lastTime = performance.now();
//   let frameId = undefined;

//   function tick(current) {
//     let current;
//     frameId = window.requestAnimationFrame(tick);

//     const deltaTime = (current - lastTime) / 1000;

//     initialize();
//     update(deltaTime);

//     lastTime = current;
//   }

//   tick(performance.now());
// }

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
