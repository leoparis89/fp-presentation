/* eslint-disable no-useless-concat */
describe("String type", () => {
  it("is a semigroup because rit has an associative concat method)", () => {
    const result1 = "foo".concat("bar").concat("baz");
    const result2 = "foo".concat("bar".concat("baz"));

    expect(result1).toEqual(result2);
  });

  it("is a monoid because it has a neutral element", () => {
    const identity = "";

    expect("foo".concat(identity)).toEqual("foo");
    expect(identity.concat("foo")).toEqual("foo");
  });
});
