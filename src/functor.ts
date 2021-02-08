export class Box {
  constructor(private x: any) {}

  static of(x) {
    return new Box(x);
  }

  map(f) {
    return Box.of(f(this.x));
  }

  fold(f: Function) {
    return f(this.x);
  }
}

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
