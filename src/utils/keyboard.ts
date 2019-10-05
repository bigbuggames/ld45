interface Keyboard {
  getPressedKeys: () => string[];
}

export default function keyboard() {
  let pressedKeys: string[] = [];

  document.addEventListener("keydown", event => {
    if (!pressedKeys.includes(event.key)) {
      pressedKeys.push(event.key);
    }
  });

  document.addEventListener("keyup", event => {
    pressedKeys = pressedKeys.filter(key => key !== event.key);
  });

  function getPressedKeys(): string[] {
    return pressedKeys;
  }

  return {
    getPressedKeys
  };
}
