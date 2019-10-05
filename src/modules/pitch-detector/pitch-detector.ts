import { css } from "linaria";
import keyboard from "../../utils/keyboard";
import { detectVoice } from "./utils";

const boxContainer = css`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const disabledBox = css`
  border: 1px dashed grey;
  width: 40px;
  height: 40px;
`;

const enabledBox = css`
  border: 1px dashed grey;
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
          <ul class=${boxContainer}>
            <li class=${enabledBox}></li>
            <li class=${disabledBox}></li>
            <li class=${disabledBox}></li>
          </ul>
        `;
      } else if (activeKey === "w") {
        return `
          <ul class=${boxContainer}>
            <li class=${disabledBox}></li>
            <li class=${enabledBox}></li>
            <li class=${disabledBox}></li>
          </ul>
        `;
      } else if (activeKey === "e") {
        return `
          <ul class=${boxContainer}>
            <li class=${disabledBox}></li>
            <li class=${disabledBox}></li>
            <li class=${enabledBox}></li>
          </ul>
        `;
      }
    }

    return `
      <ul class=${boxContainer}>
        <li class=${disabledBox}></li>
        <li class=${disabledBox}></li>
        <li class=${disabledBox}></li>
      </ul>
    `;
  }

  function update(frequencyData: Uint8Array) {
    // Taking the first keyCode (no poliphony)
    const activeKey = userInput
      .getPressedKeys()
      .filter(keyCode => validInput.includes(keyCode))[0];

    // Changing UI state depending on input
    let voiceActive = detectVoice(frequencyData, VOICE_THERESHOLD);
    element.innerHTML = getBoxElements(voiceActive, activeKey);
  }

  return { update };
}
