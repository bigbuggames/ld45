import PitchDetector from "./modules/PitchDetector";

export function initializeAudioAnalizer(stream) {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;

  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  const frequencyData = new Uint8Array(analyser.frequencyBinCount);

  // Sample environment noise to substract it
  // TODO: Low-pass filter

  const pitchManager = PitchDetector();

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
