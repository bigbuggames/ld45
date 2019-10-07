import sprites from "../../../assets/sprites";

interface SpanwPoint {
  x: number;
  y: number;
  angle: number;
  scale: number;
  mirror: boolean;
  layer: number;
}

const debugSpawnPoint = `
  position: absolute;
  background: red;
  height: 5px;
  width: 5px;
  border-radius: 10px;
`;

const debugVector = ({ angle }: SpanwPoint) => `
  position: relative;
  height: 40px;
  width: 3px;
  background: fuchsia;
  transform-origin: top center;
  transform: rotate(${angle}deg);
`;

const generateDebugSpawnPointStyles = ({ x, y, angle, scale }: SpanwPoint) => `
  ${debugSpawnPoint}
  top: ${y}px;
  left: ${x}px;
  transform: scale(${scale});
`;

const generateSpawnPointStyles = ({
  x,
  y,
  angle,
  scale,
  layer,
  mirror
}: SpanwPoint) => {
  const sign = mirror ? "-" : "";
  return `
    position: absolute;
    top: ${y}px;
    left: ${x}px;
    transform-origin: top center;
    transform: scale(${scale}) rotate(${sign}${angle}deg);
    z-index: ${layer};
  `;
};

export function createDebugSpawnPoint(pointData: SpanwPoint) {
  const point = document.createElement("div");
  const vector = document.createElement("div");

  vector.setAttribute("style", debugVector(pointData));
  point.setAttribute("style", generateDebugSpawnPointStyles(pointData));

  point.appendChild(vector);

  return point;
}

function animateSprite(
  element: HTMLElement,
  sprite: string,
  pointData: SpanwPoint,
  options: {
    spriteWidth: number;
    spriteHeight: number;
    steps: number;
    fps: number;
    riseFps: number;
  }
) {
  const { x, y, angle, mirror } = pointData;
  const { spriteWidth, spriteHeight, steps, fps, riseFps } = options;
  let position = spriteWidth;

  // Setting general sprite styles
  element.style.width = `${spriteWidth}px`;
  element.style.height = `${spriteHeight}px`;
  element.style.backgroundImage = `url(${sprite})`;
  element.style.backgroundOrigin = "bottom left";

  const delayBasedOnFps = (1 / fps) * 1000;
  const riseAnimationFps = (1 / riseFps) * 1000;

  // Calculating direction increments
  const finalAngle = mirror === false ? 180 - angle : angle;
  let top = 0;
  // let left = 0;
  // let dx = Math.cos(finalAngle);
  // let dy = Math.sin(finalAngle);

  // Moving up sprite
  setInterval(() => {
    element.style.top = `${y - top}px`;
    // element.style.left = `${x - left}px`;

    if (top < spriteHeight * 0.4) {
      top = top + 1;
      // top = top + dy;
      // left = left + dx;
    }
  }, riseAnimationFps);

  // sprite animation
  setInterval(() => {
    element.style.backgroundPosition = `-${position}px 0px`;
    if (position < steps * spriteWidth) {
      position = position + spriteWidth;
    } else {
      position = spriteWidth;
    }
  }, delayBasedOnFps);
}

export function spawnSinger(pointData: SpanwPoint) {
  const singer = document.createElement("div");

  const debugMask = createDebugSpawnPoint(pointData);
  singer.appendChild(debugMask);

  // const randomSpriteIndex = seededRandom.randomIntRange(0, sprites.length);
  const sprite = sprites[0];

  singer.setAttribute("style", generateSpawnPointStyles(pointData));

  animateSprite(singer, sprite, pointData, {
    spriteWidth: 121,
    spriteHeight: 352,
    steps: 126,
    fps: 15,
    riseFps: 60
  });

  return singer;
}
