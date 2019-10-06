interface MusicGenerator {
  generateBarsForChord: (barsToGenerate: number, chord: number) => string[];
  generateProgression: (
    chordProgression: number[],
    barsPerChord: number
  ) => string[];
}

interface Bar {
  id: string;
  notes: string[];
}

interface Sheet {
  progression: string[];
  barsPerChord: number;
  cycles: number;
  bars: object[];
  notes: string[];
}

export default function MusicGenerator(
  chords: object,
  seededRandomIntRange: (max: number, min: number) => number
): MusicGenerator {
  function getChordNumberFromRomanNumeral(romanNumeral: string): number {
    return {
      I: 1,
      II: 2,
      V: 5
    }[romanNumeral];
  }

  /**
   * Translates the chord objects to something the generator understands
   * @param chords array of chord objects
   */
  function generateBarsObject(chords) {
    return chords.reduce((acc, chord) => {
      return {
        ...acc,
        [getChordNumberFromRomanNumeral(chord.id)]: chord.bars
      };
    }, {});
  }

  function convertToStreamOfNotes(bars: Bar[]): string[] {
    return bars
      .map(bar => bar.notes)
      .reduce((acc, bar) => {
        acc = [...acc, ...bar];
        return acc;
      }, []);
  }

  function generateBarsForChord(barsToGenerate, chord) {
    return [...Array(barsToGenerate)].map(() => {
      const barIndex = seededRandomIntRange(0, bars[chord].length);
      return bars[chord][barIndex];
    });
  }

  function generateProgression(
    chordProgression: number[],
    barsPerChord: number
  ) {
    let progression = [];

    chordProgression.forEach(chord => {
      progression = [
        ...progression,
        ...generateBarsForChord(barsPerChord, chord)
      ];
    });

    return progression;
  }

  // TODO: This makes some function not pure!
  const bars = generateBarsObject(chords);

  function generateSheet(options): Sheet {
    const { chordProgression, barsPerChord = 4, cycles = 1 } = options;

    let allBars = [];
    for (let i = 0; i < cycles; i++) {
      allBars = [
        ...allBars,
        ...generateProgression(chordProgression, barsPerChord)
      ];
    }

    return {
      progression: chordProgression,
      barsPerChord,
      cycles,
      bars: allBars,
      notes: convertToStreamOfNotes(allBars)
    };
  }

  return {
    generateBarsForChord,
    generateProgression,
    generateSheet
  };
}
