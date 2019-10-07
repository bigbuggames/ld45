import { css } from "linaria";

const beatContainer = css`
  display: flex;
  flex-direction: column;

  div {
    box-sizing: border-box;
  }
`;

const beatCommons = `
  width: 80px;
  height: 40px;
  border-radius: 10px;
`;

const inactiveBeat = css`
  ${beatCommons}
`;

const activeNote = css`
  ${beatCommons}
  background-color: #F6F5C2;
`;

export function getCssForBeat(active: string): (string) => string {
  return note => (note === active ? activeNote : inactiveBeat);
}

export function generateBeat(note: string): string {
  const highBeat = getCssForBeat("H");
  const middleBeat = getCssForBeat("M");
  const lowBeat = getCssForBeat("L");

  return `
    <span class=${beatContainer}>
      <div class=${highBeat(note)}></div>
      <div class=${middleBeat(note)}></div>
      <div class=${lowBeat(note)}></div>
    </span>
  `;
}

const sheetContainer = css`
  display: flex;
`;

export function generateBeatElementsFromNotes(notes) {
  return notes
    .map(note => {
      return generateBeat(note)
        .replace(/\n/g, "")
        .replace(/ +(?= )/g, " ");
    })
    .join("");
}

export default function SheetRenderer(sheet) {
  const element = document.createElement("span");
  const beats = generateBeatElementsFromNotes(sheet.notes);

  element.innerHTML = `
    <div class=${sheetContainer}>
      ${beats}
    </div>
  `;

  return {
    element
  };
}
