export const Box = (x) => ({
  map: (f: Function) => Box(f(x)),
  fold: (f: Function) => f(x),
});

// export class Container {
//   constructor(private x: any) {}

//   static of(x) {
//     return new Container(x);
//   }

//   map(f) {
//     return Container.of(f(this.x));
//   }

//   fold(f: Function) {
//     return Container.of(f(this.x));
//   }
// }

export const Right = (x) => ({
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
});

export const Left = (x) => ({
  map: (f) => Left(x),
  fold: (f, g) => f(x),
});

//tryCatch:: a -> b -> Either b
export const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};
