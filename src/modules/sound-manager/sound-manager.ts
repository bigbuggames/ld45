import { Howl } from "howler";

import chord1 from "../../../assets/audio/chord1";
import chord2 from "../../../assets/audio/chord2";
import chord5 from "../../../assets/audio/chord5";

export default function SoundManager(sheet) {
  function createHowl(src: string[]) {
    return new Howl({ src });
  }

  function initializeChord(chord) {
    return {
      chord: createHowl(chord.chord),
      bars: chord.bars.map(bar => createHowl(bar.howl))
    };
  }

  function initialize(rawChordObject: object[]) {
    let chords = {};
    rawChordObject.forEach(rawChord => {
      chords = {
        ...chords,
        [rawChord.id]: initializeChord(rawChord)
      };
    });

    return chords;
  }

  // function playBar(chord: string, bar: number) {}

  const sounds = initialize([chord1, chord2, chord5]);

  sounds["II"].chord.play();

  console.log("SoundManager initialized...", sheet);

  let time = 0;
  function update(deltaTime) {
    time = time + deltaTime;

    const beat = Math.round(time);

    console.log("SoundManager", beat);
  }

  return { update };
}
