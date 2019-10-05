import { css } from "linaria";

import { Note } from "../music-manager/music-manager";

const beatContainer = css`
  display: flex;
  flex-direction: column;
`;

const inactiveBeat = css`
  border: 1px dashed grey;
  width: 40px;
  height: 40px;
`;

const activeNote = css`
  border: 1px dashed forestgreen;
  background-color: forestgreen;
  width: 40px;
  height: 40px;
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

  let x = 0;

  const dynamicTransform = positionX => `
    position: absolute;
    top: 0;
    left: 0;
    transform: translate3d(${positionX}px, 0, 0);
  `;

  element.innerHTML = `
    <div class=${sheetContainer}>
      ${beats}
    </div>
  `;
  document.body.appendChild(element);

  function update() {
    x = x - 1;
    element.setAttribute("style", dynamicTransform(x));
  }

  return {
    update
  };
}
