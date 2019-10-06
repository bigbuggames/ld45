import { Howl } from "howler";

// Is this kind of an iterator pattern?
// TODO: Move to utils file
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

// TODO: If we use roman numerals directly this conversions can be avoided
function getRomanChord(progression, index) {
  return {
    1: "I",
    2: "II",
    5: "V"
  }[progression[index]];
}

export default function SoundManager(sheet, chords) {
  const element = document.createElement("button");

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

  /**
   * Increments the bar and choir indexes.
   * @param next executin it allows the trigger to be executed again
   */
  function incrementMusicCounters(next) {
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
  }

  function delayedHowl(delay, src) {
    return new Promise(resolve => {
      setInterval(() => {
        console.log("creating hoooowl!!!");
        resolve(createHowl(src, true));
      }, delay);
    });
  }

  // TODO: Create a sync counter
  function triggerMultipleChoir(src: object, count: number, delay: number) {
    const test = [...Array(count)].reduce(acc => {
      return acc.then(delayedHowl(delay, src));
    }, Promise.resolve());

    console.log("test", test);
  }

  let time = 0;
  let currentBarIndex = 0;
  let currentChordIndex = 0;
  let chorusCount = 0;

  const sounds = initialize(chords);
  const barTrigger = triggerFactory(1);

  console.log("SoundManager initialized...", sounds, sheet);

  // function debug(currentBeat) {
  //   console.log(
  //     currentBeat,
  //     currentChordIndex,
  //     currentBarIndex,
  //     getRomanChord(sheet.progression, currentChordIndex),
  //     chorusCount
  //   );
  // }

  function update(deltaTime) {
    time = time + deltaTime;
    // const currentBeat = Math.round(time);

    // plays every beat
    barTrigger(next => {
      // plays the chords every beat
      const chord =
        sounds[getRomanChord(sheet.progression, currentChordIndex)].chord;
      chord.play();
      chord.on("end", () => incrementMusicCounters(next));

      // triggers multiple voice chorus depending
      triggerMultipleChoir(sheet.bars[currentBarIndex].howl, chorusCount, 1000);
    });
  }

  element.innerHTML = "Increment Chorus members!!!";
  element.onclick = () => {
    chorusCount = chorusCount + 1;
  };

  document.body.appendChild(element);

  return { update };
}
