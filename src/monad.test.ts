import fs from "fs";
import { Box } from "./functor";
import { tryCatch, IO, Task } from "./monad";

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
    const add = (x) => (y) => x + y;
    expect(Box.of(add).app(3).app(4)).toEqual(Box.of(7));
  });
});
