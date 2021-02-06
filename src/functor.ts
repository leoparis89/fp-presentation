export const Box = (x: any) => ({
  map: (f: Function) => Box(f(x)),
  fold: (f: Function) => f(x),
});
