import { css } from "linaria";
import keyboard from "../../utils/keyboard";
import { detectVoice } from "./utils";

const boxContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  z-index: 10;
`;

const disabledBox = css`
  border: 1px solid green;
  width: 40px;
  height: 40px;
`;

const enabledBox = css`
  border: 1px solid red;
  background-color: tomato;
  width: 40px;
  height: 40px;
`;

export default function PitchDetector() {
  const VOICE_THERESHOLD = 5000;
  const validInput = ["q", "w", "e"];

  let element: HTMLElement = document.createElement("div");
  let userInput = keyboard();

  element.innerHTML = `
    <div>Engaging pitch detector...</div>
  `;
  document.body.appendChild(element);

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

  function update(frequencyData: Uint8Array) {
    // Taking the first keyCode (no poliphony)
    const activeKey = userInput
      .getPressedKeys()
      .filter(keyCode => validInput.includes(keyCode))[0];

    // Changing UI state depending on input
    let voiceActive = detectVoice(frequencyData, VOICE_THERESHOLD);
    console.log(activeKey);

    element.innerHTML = getBoxElements(voiceActive, activeKey);
  }

  return { update };
}
