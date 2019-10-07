import seedrandom from "seedrandom";

interface Random {
  randomSign: () => number;
  randomIntRange: (min: number, max: number) => number;
  randomWalk: (maxArea: number) => number[];
}

export default function rnd(seed: string): Random {
  const rng = seedrandom(seed);

  function randomSign(): number {
    return rng.quick() >= 0.5 ? 1 : -1;
  }

  function randomIntRange(min: number, max: number): number {
    return Math.floor(rng.quick() * max) + min;
  }

  function randomFloatRange(min: number, max: number): number {
    return rng.quick() * max + min;
  }

  function randomWalk(maxArea: number): number[] {
    return [rng.quick() * randomSign(), rng.quick() * randomSign()].map(
      number => number * maxArea
    );
  }

  return {
    rng,
    randomSign,
    randomIntRange,
    randomFloatRange,
    randomWalk
  };
}
