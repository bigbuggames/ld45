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

  const sounds = initialize(chords);
  console.log("SoundManager initialized...", sounds, sheet);

  // TODO: Is this a iterator pattern?
  function triggerFactory(times = 1) {
    let triggered = false;
    let counter = 1;

    function next() {
      triggered = false;
    }

    return function trigger(callback) {
      if (triggered) {
        return;
      }

      callback(next);

      if (counter === times) {
        triggered = true;
      } else {
        counter = counter + 1;
      }
    };
  }

  function getRomanChord(progression, index) {
    return {
      1: "I",
      2: "II",
      5: "V"
    }[progression[index]];
  }

  let time = 0;
  let currentBarIndex = 0;
  let currentChordIndex = 0;

  const barTrigger = triggerFactory(1);

  function update(deltaTime) {
    time = time + deltaTime;
    const currentBeat = Math.round(time);

    // plays every beat
    barTrigger(next => {
      // plays the chords every beat
      sounds[getRomanChord(sheet.progression, currentChordIndex)].chord.play();

      const choirs = new Howl({
        autoplay: true,
        src: sheet.bars[currentBarIndex].howl
      });

      console.log(
        currentBeat,
        currentChordIndex,
        currentBarIndex,
        getRomanChord(sheet.progression, currentChordIndex)
      );

      choirs.on("end", function() {
        currentBarIndex = currentBarIndex + 1;

        // Every four bars we trigger a backgroundChoir change
        if (currentBarIndex % 4 === 0) {
          // Resets the chord index to start again with the progression
          if (currentChordIndex === sheet.progression.length - 1) {
            currentChordIndex = 0;
          } else {
            currentChordIndex = currentChordIndex + 1;
          }
        }
        next();
      });
    });
  }

  return { update };
}
