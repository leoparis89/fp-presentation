import { curry } from "./utilities";

describe("curry", () => {
  it("curries functions", () => {
    const _add = (x, y) => x + y;
    const add = curry(_add);
    const add2 = add(2);

    expect(add(2, 2)).toEqual(4);
    expect(add(2)(2)).toEqual(4);
    expect(add2(2)).toEqual(4);
  });
});
