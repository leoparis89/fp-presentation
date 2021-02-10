import { random, randomInRange } from "./stateMonad";

describe("state mondad", () => {
  test("experiments", () => {
    const nextSeed = 2811915801;
    expect(random(1)).toEqual(nextSeed);

    const nextSeed2 = 2461393960;
    expect(random(nextSeed)).toEqual(nextSeed2);
  });
  test("random in range", () => {
    expect(randomInRange(893, 1, 10)).toEqual(4);
  });
});
