export const random: Number<number> = (seed: number) => {
  const nextSeed = (1839567234 * seed + 972348567) % 8239451023;
  return [nextSeed, nextSeed];
};

const m = 8239451023;

type State<S, A> = (state: S) => [S, A];

type Number<A> = State<number, A>;

type map = <A, B>(f: (a: A) => B) => <E>(s: State<E, A>) => State<E, B>;
// export const randomInRange = (seed: number, min: number, max: number) => {
//   const nextSeed = random(seed);
//   const nextRandom = min + Math.floor((nextSeed / m) * (max - min));
//   return [nextSeed, nextRandom];
// };
