import fs from "fs";
import { Box, tryCatch } from "./functor";

describe("Functors", () => {
  describe("Identity functor", () => {
    describe("verify functor laws", () => {
      const f = (x: number) => x * 2;
      const g = (x: number): Boolean => x % 2 === 0;
      const h = (x) => g(f(x));
      const identity = (x) => x;

      test("composition law", () => {
        const compaLawResult1 = Box(3).map(f).map(g);
        const compaLawResult2 = Box(3).map(h);

        expect(JSON.stringify(compaLawResult1)).toEqual(
          JSON.stringify(compaLawResult2)
        );
      });

      test("identity law", () => {
        const idResult1 = identity(Box(3));
        const idResult2 = Box(3).map(identity);

        expect(JSON.stringify(idResult1)).toEqual(JSON.stringify(idResult2));
      });
    });

    test("use case with no statefull variables", () => {
      const nextCharForNumberStringImperative = (str) => {
        const trimmed = str.trim();
        const number = parseInt(trimmed);
        const nextNumber = number + 1;
        return String.fromCharCode(nextNumber);
      };

      const nextCharForNumberString = (str) =>
        Box(str)
          .map((s) => s.trim())
          .map((s) => Number(s))
          .map((i) => i + 1)
          .map((i) => String.fromCharCode(i))
          .fold((c) => c.toLowerCase());

      expect(nextCharForNumberString(" 64")).toEqual("a");
    });
  });

  describe("Either", () => {
    test("imperative code example", () => {
      // getPort :: String -> String
      const getPort = (path) => {
        try {
          const str = fs.readFileSync(path) as any;
          const config = JSON.parse(str);
          return config.port;
        } catch (e) {
          return 3000;
        }
      };
      expect(getPort("src/config.json")).toEqual(8000);
      expect(getPort("src/missing.json")).toEqual(3000);
    });

    test("example with map", () => {
      const getPort = (path) =>
        tryCatch(() => fs.readFileSync(path))
          .map((c) => JSON.parse(c))
          .fold(
            (e) => 3000,
            (c) => c.port
          );

      expect(getPort("src/config.json")).toEqual(8000);
      expect(getPort("src/missing.json")).toEqual(3000);
    });
  });
});
