import random from "./utils/random";
import PitchDetector from "./modules/pitch-detector";
import MusicGenerator from "./modules/music-generator";
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

  console.log(sheet);

  (function update() {
    analyser.getByteFrequencyData(frequencyData);

    pitchManager.update(frequencyData);

    requestAnimationFrame(update);
  })();
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
