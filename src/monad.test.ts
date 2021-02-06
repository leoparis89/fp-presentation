import fs from "fs";
import { tryCatch, IO } from "./monad";

test("one (map)", () => {
  const getPort = (path) =>
    tryCatch(() => fs.readFileSync(path))
      .chain((c) => tryCatch(() => JSON.parse(c)))
      .fold(
        (e) => 3000,
        (c) => {
          expect(c.port).toEqual(8000);
        }
      );

  getPort("src/config.json");
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

  nextCharForNumberString(" 64").fold((val) => {
    expect(val).toEqual("a");
  });
});
