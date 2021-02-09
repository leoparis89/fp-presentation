export class Box {
  constructor(private x: any) {}

  static of(x) {
    return new Box(x);
  }

  map(f) {
    return Box.of(f(this.x));
  }

  chain(f) {
    return f(this.x);
  }

  fold(f: Function) {
    return f(this.x);
  }

  ap(fx) {
    return fx.map(this.x);
  }
}

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

  ap(fx) {
    return fx.map(this.x);
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
  ap(fx) {
    return this;
  }
  fold(f, g) {
    return f(this.x);
  }
}

export class Eiter {
  static of(x) {
    return new Right(x);
  }
  constructor(private x: any) {}
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
// F(x).map(f) = F(f).ap(F(x))
// export const liftA2 = (f, fx, fx) => F(f).ap(fx).ap(fy)
// export const liftA2 = (f, fx, fx) => F(f).ap(fx).ap(fy)

export const liftA2 = (f, fx, fy) => fx.map(f).ap(fy);
export class List {
  static of(x) {
    return new List(Array.isArray(x) ? x : [x]);
  }
  constructor(private x: any) {}

  map(f) {
    return List.of(this.x.map(f));
  }

  chain(f) {
    return List.of(this.x.map(f)).flatten();
  }

  flatten() {
    return List.of(this.x.flat());
  }

  ap(fx) {
    return this.map((f) => fx.map(f)).flatten();
    // return fx.chain((el) => this.x.map((f) => f(el)));

    // return fx.map((e) => e);
  }
}
