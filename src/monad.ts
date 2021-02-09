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

type Calculation = (reject: Function, resolve: Function) => any;
export class Task {
  constructor(public fork: Calculation) {}

  static of(b) {
    return new Task((_, resolve) => {
      return resolve(b);
    });
  }

  static rejected(b) {
    return new Task((reject, _) => {
      return reject(b);
    });
  }

  map(f) {
    return new Task((reject, resolve) =>
      this.fork(reject, (v) => resolve(f(v)))
    );
  }
}

const double = (x) => x * 2;
const divide = (x) => x / 3;
const toString = (x) => String(x);

const total = (x) => toString(divide(double(x)));
