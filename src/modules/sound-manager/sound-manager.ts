import { Howl } from "howler";

export default function SoundManager(sheet, chords) {
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

  const sounds = initialize(chords);

  sounds["II"].chord.play();

  console.log("SoundManager initialized...", sheet);

  let time = 0;
  function update(deltaTime) {
    time = time + deltaTime;
    const beat = Math.round(time);
  }

  return { update };
}
