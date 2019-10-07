import { css } from "linaria";

import ruins from "../../../assets/images/ruins.png";
import firstColumn from "../../../assets/images/first-column.png";
import stage1 from "../../../assets/images/stage-1.png";
import stage2 from "../../../assets/images/stage-2.png";
import stage3 from "../../../assets/images/stage-3.png";

const stageStyles = css`
  position: relative;
  width: 1600px;
  height: 900px;
  background: #f6f5c2;
  overflow: hidden;

  img {
    position: absolute;
    width: 1600px;
    height: 900px;
    background-origin: top left;
  }
`;

const sheetStyles = css`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const pitchStyles = css`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default function SpawnManager(sheetRenderer, pitchDetector) {
  // create stage
  const stage = document.createElement("div");
  stage.className = stageStyles;

  // create all the images
  const background = document.createElement("div");
  background.id = "background";

  // IMPORTANT: The order of the images affects the layer where they're placed
  background.innerHTML = `
    <img src=${ruins}></img>
    <img src=${firstColumn}></img>
    <img src=${stage3}></img>
    <img src=${stage2}></img>
    <img src=${stage1}></img>
  `;

  // create anchor for screen renderer
  const sheetAnchor = document.createElement("div");
  sheetAnchor.className = sheetStyles;
  sheetAnchor.appendChild(sheetRenderer);

  // create anchor for pitch detector UI
  pitchDetector.className = pitchStyles;
  background.appendChild(pitchDetector);

  // create anchor for sheet renderer
  background.appendChild(sheetAnchor);
  stage.appendChild(background);

  document.body.appendChild(stage);

  return {
    element: stage
  };
}
