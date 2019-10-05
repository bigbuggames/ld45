interface MusicGenerator {
  generateBarsForChord: (barsToGenerate: number, chord: number) => string[];
  generateProgression: (
    chordProgression: number[],
    barsPerChord: number
  ) => string[];
}

export default function MusicGenerator(
  bars: object,
  seededRandomIntRange: (max: number, min: number) => number
): MusicGenerator {
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

  function generateSheet({
    chordProgression,
    barsPerChord = 4,
    cycles = 1
  }): object[] {
    let sheet = [];

    for (let i = 0; i < cycles; i++) {
      sheet = [
        ...sheet,
        ...generateProgression(chordProgression, barsPerChord)
      ];
    }

    return sheet;
  }

  return {
    generateBarsForChord,
    generateProgression,
    generateSheet
  };
}
