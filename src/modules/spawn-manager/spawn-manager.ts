import { css } from "linaria";

import lastTree from "../../../assets/images/last-tree.png";
import ruins from "../../../assets/images/ruins.png";
import firstColumn from "../../../assets/images/first-column.png";
import stage1 from "../../../assets/images/stage-1.png";
import stage2 from "../../../assets/images/stage-2.png";
import stage3 from "../../../assets/images/stage-3.png";

import { spawnSinger } from "../singer/singer";

const stageStyles = css`
  position: relative;
  width: 1600px;
  height: 900px;
  background: #f6f5c2;
  overflow: hidden;
  border: 4px solid black;

  img {
    position: absolute;
    width: 1600px;
    height: 900px;
    background-origin: top left;
  }
`;

const layer1 = css`
  z-index: 40;
`;
const layer2 = css`
  z-index: 30;
`;
const layer3 = css`
  z-index: 20;
`;

const sheetStyles = css`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 190;
`;

const pitchStyles = css`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
`;

// Layer 1
const layer1Points = [
  { x: 100, y: 640, angle: 10, scale: 0.8, mirror: true, layer: 35 },
  { x: 290, y: 660, angle: 10, scale: 0.8, mirror: false, layer: 35 },
  { x: 436, y: 661, angle: 15, scale: 0.8, mirror: false, layer: 35 },
  { x: 600, y: 700, angle: 15, scale: 0.8, mirror: false, layer: 35 },
  { x: 720, y: 740, angle: 15, scale: 0.8, mirror: false, layer: 35 }
];

// Layer 2
const layer2Points = [
  { x: 725, y: 680, angle: 10, scale: 0.7, mirror: true, layer: 25 },
  { x: 871, y: 600, angle: 10, scale: 0.7, mirror: false, layer: 25 },
  { x: 1017, y: 633, angle: 20, scale: 0.7, mirror: false, layer: 25 }
];

// Layer 3
const layer3Points = [
  { x: 488, y: 642, angle: 10, scale: 0.6, mirror: true, layer: 15 },
  { x: 679, y: 652, angle: 10, scale: 0.6, mirror: false, layer: 15 },
  { x: 589, y: 601, angle: 10, scale: 0.6, mirror: false, layer: 15 }
];

const spawnPoints = [...layer3Points, ...layer2Points, ...layer1Points];

export default function SpawnManager(sheetRenderer, pitchDetector) {
  // create stage
  const stage = document.createElement("div");
  stage.className = stageStyles;

  // create all the images
  const background = document.createElement("div");
  background.id = "background";

  // IMPORTANT: The order of the images affects the layer where they're placed
  background.innerHTML = `
    <img src=${lastTree}>
    <img src=${ruins}>
    <img class=${layer3} src=${stage3}>
    <img class=${layer2} src=${stage2}>
    <img class=${layer1} src=${stage1}>
    <img class=${layer1} src=${firstColumn}>
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

  // button to spawn singers
  // const button = document.createElement("button");
  // button.innerHTML = "Add singer";
  // button.onclick = () => {
  //   if (typeof spawnPoints[singerCount] !== "undefined") {
  //     background.appendChild(spawnSinger(spawnPoints[singerCount]));
  //     singerCount = singerCount + 1;
  //   }
  // };
  // document.body.appendChild(button);

  // stage.addEventListener("mousemove", event => {
  //   const x = event.pageX - stage.offsetLeft;
  //   const y = event.pageY - stage.offsetTop;
  //   console.log(x, y);
  // });

  let singerCount = 0;
  let scoreToSpawn = 150;

  // An obsrever pattern here is better than using the update
  function update(score) {
    if (score > scoreToSpawn * (singerCount + 1)) {
      if (typeof spawnPoints[singerCount] !== "undefined") {
        background.appendChild(spawnSinger(spawnPoints[singerCount]));
        singerCount = singerCount + 1;
      }
    }
  }

  document.body.appendChild(stage);
  return {
    element: stage,
    update
  };
}
