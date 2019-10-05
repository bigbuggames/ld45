import { keyboard } from "./utils/keyboard";

// exposing keyboard as a global variable
// window.keyboard = keyboard;

function initializeWorld() {
  console.log("intializing world...");

  return [];
}

function processInput() {
  // const input = inputMethod.getPressedKeys();
}

function update(deltaTime, entity) {
  entity.update(deltaTime);
}

function render(entity) {
  entity.render();
}

function game() {
  const state = {
    frameId: undefined,
    lastTime: window.performance.now(),
    isRunning: true
  };

  // setting up world
  const entities = initializeWorld();

  // setting up input device
  const input = keyboard();

  function tick(current) {
    state.frameId = window.requestAnimationFrame(tick);

    const deltaTime = (current - state.lastTime) / 1000;
    processInput(input);

    entities.forEach(entity => {
      update(deltaTime, entity);
      render(entity);
    });

    state.lastTime = current;
  }

  tick(state.lastTime);
}

window.onload = function load() {
  console.log("assets loaded...");
  game();
};
