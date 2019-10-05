interface MusicGenerator {
  generateBarsForChord: (barsToGenerate: number, chord: number) => string[];
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

  function generateSheet({ chordProgression, barsPerChord }): object[] {
    let sheet = [];

    chordProgression.forEach(chord => {
      sheet = [...sheet, ...generateBarsForChord(barsPerChord, chord)];
    });

    return sheet;
  }

  return {
    generateBarsForChord,
    generateSheet
  };
}
