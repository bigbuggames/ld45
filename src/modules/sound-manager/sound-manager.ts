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

  function triggerVoicedHowl(
    src: string,
    voices: number = 1,
    delay: number = 50
  ) {
    let voiceCount = 0;

    const interval = setInterval(() => {
      if (voiceCount < voices) {
        createHowl(src, true);
        voiceCount = voiceCount + 1;
        console.log("voice triggered", voiceCount, src);
      } else {
        window.clearInterval(interval);
      }
    }, delay);
  }

  let time = 0;
  let currentBarIndex = 0;
  let currentChordIndex = 0;
  let chorusCount = 0;

  const sounds = initialize(chords);
  const barTrigger = triggerFactory(1);

  console.log("SoundManager initialized...", sounds, sheet);

  function debug(currentBeat) {
    console.log(
      currentBeat,
      currentChordIndex,
      currentBarIndex,
      getRomanChord(sheet.progression, currentChordIndex),
      chorusCount,
      sheet.bars[currentBarIndex]
    );
  }

  function update(deltaTime) {
    time = time + deltaTime;
    const currentBeat = Math.round(time);

    // plays every beat
    barTrigger(next => {
      debug(currentBeat);

      // triggers multiple voice chorus depending
      // triggerVoicedHowl(sheet.bars[currentBarIndex].howl, chorusCount, 500);

      // plays the chords every beat
      const chord =
        sounds[getRomanChord(sheet.progression, currentChordIndex)].chord;
      chord.play();

      const choirs = new Howl({
        autoplay: true,
        src: sheet.bars[currentBarIndex].howl
      });

      choirs.on("end", () => incrementMusicCounters(next));
    });
  }

  element.innerHTML = "Increment Chorus members!!!";
  element.onclick = () => {
    chorusCount = chorusCount + 1;
  };

  // document.body.appendChild(element);

  return { update };
}
