import { css } from "linaria";
import keyboard from "../../utils/keyboard";
import { detectVoice } from "./utils";

const boxContainer = css`
  position: absolute;
  bottom: 4px;
  left: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  z-index: 10;

  div {
    box-sizing: border-box;
  }
`;

const boxCommon = `
  border-radius: 20px;
  border: 4px solid black;
  margin: 5px;
  width: 30px;
  height: 30px;
`;

const disabledBox = css`
  ${boxCommon}
  background: #f6f5c2;
`;

const enabledBox = css`
  ${boxCommon}
  background: #4dad94;
`;

export default function PitchDetector() {
  const VOICE_THERESHOLD = 5000;
  const validInput = ["q", "w", "e"];

  let element: HTMLElement = document.createElement("div");
  let userInput = keyboard();

  function getBoxElements(voiceActive: boolean, activeKey: string) {
    if (voiceActive) {
      if (activeKey === "q") {
        return `
          <span class=${boxContainer}>
            <div class=${enabledBox}></div>
            <div class=${disabledBox}></div>
            <div class=${disabledBox}></div>
          </span>
        `;
      } else if (activeKey === "w") {
        return `
          <span class=${boxContainer}>
            <div class=${disabledBox}></div>
            <div class=${enabledBox}></div>
            <div class=${disabledBox}></div>
          </span>
        `;
      } else if (activeKey === "e") {
        return `
          <span class=${boxContainer}>
            <div class=${disabledBox}></div>
            <div class=${disabledBox}></div>
            <div class=${enabledBox}></div>
          </span>
        `;
      }
    }

    return `
      <span class=${boxContainer}>
        <div class=${disabledBox}></div>
        <div class=${disabledBox}></div>
        <div class=${disabledBox}></div>
      </span>
    `;
  }

  function update(frequencyData: Uint8Array): string {
    // Taking the first keyCode (no poliphony)
    const activeKey = userInput
      .getPressedKeys()
      .filter(keyCode => validInput.includes(keyCode))[0];

    // Changing UI state depending on input
    let voiceActive = detectVoice(frequencyData, VOICE_THERESHOLD);

    element.innerHTML = getBoxElements(voiceActive, activeKey);

    if (voiceActive) {
      return activeKey;
    }
  }

  return { element, update };
}
