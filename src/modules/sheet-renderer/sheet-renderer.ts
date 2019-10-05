import { css } from "linaria";

import { beat } from "../beat/beat";

const beatContainer = css`
  display: flex;
  flex-direction: column;
`;

const inactiveBeat = css`
  border: 1px dashed grey;
  width: ${beat.width}px;
  height: ${beat.height}px;
`;

const activeNote = css`
  border: 1px dashed ${beat.activeColor};
  background-color: ${beat.activeColor};
  width: ${beat.width}px;
  height: ${beat.height}px;
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

export function convertToStreamOfNotes(sheet) {
  return sheet
    .map(bar => bar.notes)
    .reduce((acc, bar) => {
      acc = [...acc, ...bar];
      return acc;
    }, []);
}

export function generateBeatElementsfromNotes(notes) {
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
  const streamOfNotes = convertToStreamOfNotes(sheet);
  const beats = generateBeatElementsfromNotes(streamOfNotes);

  element.innerHTML = `
    <div class=${sheetContainer}>
      ${beats}
    </div>
  `;
  document.body.appendChild(element);

  return {
    element
  };
}
