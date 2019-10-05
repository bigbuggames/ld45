import { getOctaveFrequencyArray, addValueToFrequencyRange } from "./utils";

describe("PitchDetector module", () => {
  describe("addValueToFrequencyRange", () => {
    test("should classify frequencies correctly", () => {
      // const frequencyRanges = [
      //   { min: 160, max: 250 },
      //   { min: 251, max: 800 },
      //   { min: 801, max: 300 }
      // ];
      let rangeArray = [0, 0, 0];

      rangeArray = addValueToFrequencyRange(rangeArray, 200, 10);
      expect(rangeArray).toStrictEqual([10, 0, 0]);

      rangeArray = addValueToFrequencyRange(rangeArray, 200, 10);
      expect(rangeArray).toStrictEqual([20, 0, 0]);

      rangeArray = addValueToFrequencyRange(rangeArray, 400, 10);
      expect(rangeArray).toStrictEqual([20, 10, 0]);

      rangeArray = addValueToFrequencyRange(rangeArray, 2000, 10);
      expect(rangeArray).toStrictEqual([20, 10, 10]);
    });
  });

  describe("getOctaveFrequencyArray()", () => {});
});
