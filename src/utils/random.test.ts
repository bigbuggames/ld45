import random from "./random";

describe("random", () => {
  let rng;
  beforeEach(() => {
    rng = random("hello");
  });

  test("generates a random sign", () => {
    const signs = [0, 0, 0, 0, 0].map(() => rng.randomSign());
    const result = [1, -1, 1, 1, -1];

    expect(signs).toStrictEqual(result);
  });
});
