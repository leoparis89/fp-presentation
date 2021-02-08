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

export class Left {
  constructor(private x: any) {}

  chain(f) {
    return this;
  }
  map(f) {
    return this;
  }
  fold(f, g) {
    return f(this.x);
  }
}

//tryCatch:: a -> b -> Either b
export const tryCatch = (f) => {
  try {
    return Right.of(f());
  } catch (e) {
    return new Left(e);
  }
};

export class IO {
  constructor(private f: any) {}

  map(g) {
    return new IO(() => g(this.f()));
  }
  fold(g) {
    return g(this.f());
  }
}
