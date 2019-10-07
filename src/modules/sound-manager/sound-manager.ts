import { Howl } from "howler";

import { triggerFactory } from "../../utils/trigger";

// TODO: If we use roman numerals directly this conversions can be avoided
function getRomanChord(progression, index) {
  return {
    1: "I",
    2: "II",
    5: "V"
  }[progression[index]];
}

export default function SoundManager(sheet, chords, seededRandom) {
  function createHowl(src: string, autoplay: boolean = false): object {
    return new Howl({ autoplay, src });
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

  let time = 0;
  let currentChordIndex = 0;
  let chordCount = 0;

  const sounds = initialize(chords);
  const chordTrigger = triggerFactory(1);

  function createVoicings(src, voiceCount = 1) {
    let voices = [];
    for (let i = 0; i < voiceCount; i++) {
      voices.push(
        new Howl({
          volume: 0.6,
          src: src
          // rate: seededRandom.randomFloatRange(0.99, 1.01)
        })
      );
    }

    return voices;
  }

  function playAllVoices(voices) {
    return voices.map(voice => voice.play());
  }

  function getNumberOfVoicingsWithSingers(singers: number) {}

  function update(deltaTime, singerCount) {
    time = time + deltaTime;

    chordTrigger(next => {
      const chord =
        sounds[getRomanChord(sheet.progression, currentChordIndex)].chord;
      chord.volume(1);
      chord.play();

      chord.once("end", () => {
        chordCount = chordCount + 1;

        if (chordCount % 4 === 0) {
          if (currentChordIndex === sheet.progression.length - 1) {
            currentChordIndex = 0;
          } else {
            currentChordIndex = currentChordIndex + 1;
          }
        }

        if (singerCount > 0) {
          const voices = createVoicings(
            sheet.bars[chordCount].howl,
            singerCount
          );
          playAllVoices(voices);
        }

        next();
      });
    });
  }

  return { update };
}
