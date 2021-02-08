// export const Right = (x) => ({
//   chain: (f) => f(x),
//   map: (f) => Right(f(x)),
//   fold: (f, g) => g(x),
// });

export class Right {
  constructor(private x: any) {}

  static of(x) {
    return new Right(x);
  }
  chain(f) {
    return f(this.x);
  }
  map(f) {
    return Right.of(f(this.x));
  }
  fold(f, g) {
    return g(this.x);
  }
}

export const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
});

//tryCatch:: a -> b -> Either b
export const tryCatch = (f) => {
  try {
    return Right.of(f());
  } catch (e) {
    return Left(e);
  }
};

export const IO = (f) => ({
  map: (g) => IO(() => g(f())),
  fold: (g) => g(f()),
});
