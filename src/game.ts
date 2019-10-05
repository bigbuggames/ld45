import random from "./utils/random";

import PitchDetector from "./modules/pitch-detector";
import MusicGenerator from "./modules/music-generator";
import SheetRenderer from "./modules/sheet-renderer";

import bars from "./data/bars";

export function initializeAudioAnalizer(stream) {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;

  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  const seededRandom = random("thisissparta");

  const pitchManager = PitchDetector();
  const musicGenerator = MusicGenerator(bars, seededRandom.randomIntRange);

  const sheet = musicGenerator.generateSheet({
    chordProgression: [2, 5, 1],
    barsPerChord: 4
  });

  const sheetRenderer = SheetRenderer(sheet);

  (function update() {
    analyser.getByteFrequencyData(frequencyData);

    pitchManager.update(frequencyData);
    sheetRenderer.update();

    requestAnimationFrame(update);
  })();
}

// function game() {
//   const state = {
//     frameId: undefined,
//     lastTime: window.performance.now(),
//     isRunning: true
//   };

//   // setting up world
//   const entities = initializeWorld();

//   // setting up input device
//   const input = keyboard();

//   function tick(current) {
//     state.frameId = window.requestAnimationFrame(tick);

//     const deltaTime = (current - state.lastTime) / 1000;
//     processInput(input);

//     entities.forEach(entity => {
//       update(deltaTime, entity);
//       render(entity);
//     });

//     state.lastTime = current;
//   }

//   tick(state.lastTime);
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
