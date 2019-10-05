interface Keyboard {
  getPressedKeys: () => string[];
}

export function keyboard(): Keyboard {
  let pressedKeys = [];

  // function onChange(string) {
  //   console.log(string, pressedKeys);
  // }

  document.addEventListener("keydown", event => {
    if (!pressedKeys.includes(event.key)) {
      pressedKeys.push(event.key);
      // onChange("press");
    }
  });

  document.addEventListener("keyup", event => {
    pressedKeys = pressedKeys.filter(key => key !== event.key);
    // onChange("release");
  });

  function getPressedKeys(): string[] {
    return pressedKeys;
  }

  return {
    getPressedKeys
  };
}
