import gameConstants from "../../constants/game";

export enum Note {
  High = "H",
  Mid = "M",
  Low = "L"
}

function gameOver() {
  console.log("game over!");
}

function isCorrectKey(notes: string[], key: string, currentBeat: number) {
  const currentNote = {
    q: Note.High,
    w: Note.Mid,
    e: Note.High
  }[key];

  return notes[currentBeat] === currentNote;
}

export default function BeatManager(sheet, sheetRenderer) {
  const element = document.createElement("div");
  const bps = 60 / gameConstants.bpm;
  const fps = 60;
  const velocity = gameConstants.beatWidth / (fps * bps);
  const barNumber = sheet.bars.length;
  const beatsPerBar = 4;
  const beatNumber = barNumber * beatsPerBar;

  let x = 0;
  let currentBeat = 0;
  let score = 0;

  const dynamicTransform = positionX => `
    position: absolute;
    bottom: 4px;
    left: 0;
    transform: translate3d(${positionX}px, 0, 0);
  `;

  let counter = 0;
  function update(deltaTime: number, activeKey: string) {
    // counter needs to be using delta time to adjust for frame drops
    counter = counter + deltaTime;

    // moving the sheet render
    x = x - velocity;
    sheetRenderer.setAttribute("style", dynamicTransform(x));

    // clears interval in case the song ends
    // we can use it to trigger end sequence
    if (currentBeat > beatNumber) {
      gameOver();
    } else {
      // incrementing the beat if no end condition reached
      currentBeat = Math.round(counter);

      // calculate if input is correct for the current note
      if (isCorrectKey(sheet.notes, activeKey, currentBeat)) {
        score = score + velocity;
      }
    }

    return score;
  }

  return {
    element,
    update
  };
}
