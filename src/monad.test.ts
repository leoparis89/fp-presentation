import fs from "fs";
import { Left, Right, tryCatch } from "./monad";

test("one map", () => {
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
