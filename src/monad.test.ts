import fs from "fs";
import { Box } from "./functor";
import { tryCatch, IO, Task, liftA2, Eiter, Right, List } from "./monad";

const add = (x) => (y) => x + y;
test("Either using chain", () => {
  const getPort = (path) =>
    tryCatch(() => fs.readFileSync(path))
      .chain((c) => tryCatch(() => JSON.parse(c)))
      .fold(
        (e) => 3000,
        (c) => {
          return c.port;
        }
      );

  expect(getPort("src/config.json")).toEqual(8000);
  expect(getPort("src/missing.json")).toEqual(3000);
});

test("IO", () => {
  const nextCharForNumberString = (str) =>
    new IO(() => str)
      .map((s) => s.trim())
      .map((s) => Number(s))
      .map((v) => {
        console.log("SIDE EFFECT");
        return v;
      })
      .map((i) => i + 1)
      .map((i) => String.fromCharCode(i))
      .map((c) => c.toLowerCase());

  const res = nextCharForNumberString(" 64").fold((x) => x);
  expect(res).toEqual("a");
});

describe("Task", () => {
  test("should", (done) => {
    // const task = Task.of("bar");
    const task = new Task((reject, resolve) => {
      Promise.resolve("foo").then((val) => {
        resolve(val);
      });
    });

    task
      .map((str) => str + "bar")
      .fork(
        () => {},
        (res) => {
          expect(res).toEqual("foobar");
          done();
        }
      );
  });
});

describe("Identity functor", () => {
  it("should chain", () => {
    expect(Box.of(3).chain((x) => Box.of(x + 3))).toEqual(Box.of(6));
  });

  it("should apply", () => {
    expect(Box.of(add).ap(Box.of(3)).ap(Box.of(4))).toEqual(Box.of(7));
  });
});

describe("List Monad", () => {
  it("should map", () => {
    expect(List.of([1, 2, 3]).map((i) => i + 1)).toEqual(List.of([2, 3, 4]));
  });

  it("should apply", () => {
    // expect(List.of((x) => x + 1).ap(List.of([1, 2, 3]))).toEqual(
    //   List.of([2, 3, 4])
    // );
  });

  it("should apply2", () => {
    // expect(
    //   List.of((x) => (y) => `${x}-`).ap(List.of(["thirt", "sweater"]))
    // .ap(List.of(["small", "medium"]))
    // .ap("small")
    // ).toEqual("foo");
  });
});

describe("Applicatives", () => {
  test("liftA2", () => {
    expect(liftA2(add, Box.of(2), Box.of(3))).toEqual(Box.of(5));

    const getScreenSize = (screen) => (head) => (foot) =>
      screen - (head.height + foot.height);

    const $ = (element) => Eiter.of({ element, height: 10 });

    expect(liftA2(getScreenSize(300), $("head"), $("foot"))).toEqual(
      Right.of(280)
    );
  });
});
