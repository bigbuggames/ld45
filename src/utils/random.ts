import seedrandom from "seedrandom";

interface Random {
  randomSign: () => number;
  randomIntRange: (min: number, max: number) => number;
  randomWalk: (maxArea: number) => number[];
}

export default function rnd(seed): Random {
  const rng = seedrandom(seed);

  function randomSign(): number {
    return rng.quick() >= 0.5 ? 1 : -1;
  }

  function randomIntRange(min: number, max: number): number {
    return Math.floor(rng.quick() * max) + min;
  }

  function randomWalk(maxArea: number): number[] {
    return [rng.quick() * randomSign(), rng.quick() * randomSign()].map(
      number => number * maxArea
    );
  }

  return {
    randomSign,
    randomIntRange,
    randomWalk
  };
}
