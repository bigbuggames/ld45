// TODO: Think how to solve this pattern -> Observer pattern?
export function triggerFactory(times = 1) {
  let triggered = false;
  let counter = 1;

  function next() {
    triggered = false;
  }

  return function trigger(callback) {
    if (triggered) {
      return;
    }

    callback(next);

    if (counter === times) {
      triggered = true;
    } else {
      counter = counter + 1;
    }
  };
}
