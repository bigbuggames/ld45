import { generateBeat } from "./sheet-renderer";

describe("SheetRenderer", () => {
  describe("generates a beat column", () => {
    test("when the note is H", () => {
      const beatHtml = generateBeat("H");
    });

    test("when the note is M", () => {});

    test("when the note is L", () => {});
  });
});
