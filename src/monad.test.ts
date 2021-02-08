import fs from "fs";
import { tryCatch, IO } from "./monad";

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
    IO(() => str)
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

  const getDate = () =>
    IO(() => new Date()).map(
      (date: Date) => date + " c'est la date d'aujoudhui"
    );

  const date = getDate();
  const date2 = getDate();

  // .fold((i) => i);

  // expect(result).toEqual("bar");
});
