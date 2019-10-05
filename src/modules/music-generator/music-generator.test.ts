import random from "../../utils/random";
import MusicGenerator from "./music-generator";
import bars from "./bars";

function getSheetIds(sheet) {
  return sheet.map(bar => bar.id);
}

describe("MusicGenerator", () => {
  let musicGenerator;
  beforeAll(() => {
    const seededRandom = random("thisissparta");
    musicGenerator = MusicGenerator(bars, seededRandom.randomIntRange);
  });

  test("uses provided bars to generate a sheet of desired length", () => {
    const sheet = musicGenerator.generateBarsForChord(2, 2);
    expect(sheet.length).toBe(2);
  });

  test("picks correct bars depending on the current chord", () => {
    let sheetIds = getSheetIds(musicGenerator.generateBarsForChord(2, 2));
    expect(sheetIds).toStrictEqual(["chord2_bar3", "chord2_bar3"]);

    sheetIds = getSheetIds(musicGenerator.generateBarsForChord(3, 5));
    expect(sheetIds).toStrictEqual([
      "chord5_bar3",
      "chord5_bar1",
      "chord5_bar3"
    ]);
  });

  test("picks bars from each chord progression", () => {
    const sheet = musicGenerator.generateSheet({
      chordProgression: [2, 5, 1],
      barsPerChord: 4
    });

    expect(sheet[0]).toStrictEqual({
      id: "chord2_bar3",
      notes: [27, 28, 0, 29]
    });

    expect(getSheetIds(sheet)).toStrictEqual([
      "chord2_bar3",
      "chord2_bar2",
      "chord2_bar3",
      "chord2_bar1",
      "chord5_bar3",
      "chord5_bar2",
      "chord5_bar2",
      "chord5_bar2",
      "chord1_bar2",
      "chord1_bar3",
      "chord1_bar2",
      "chord1_bar2"
    ]);
  });
});
