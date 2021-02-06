import { Box } from "./functor";

describe("Functors", () => {
  describe("Identity functor", () => {
    test("use case with no statefull variables", () => {
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
});
