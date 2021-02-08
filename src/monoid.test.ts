import { All } from "./semigroup";

/* eslint-disable no-useless-concat */
describe("String type", () => {
  it("is a semigroup because it has an associative concat method)", () => {
    const result1 = "foo".concat("bar").concat("baz");
    const result2 = "foo".concat("bar".concat("baz"));

    expect(result1).toEqual("foobarbaz");
    expect(result2).toEqual("foobarbaz");
  });

  it("is a monoid because it has a neutral element", () => {
    const identity = "";

    expect("foo".concat(identity)).toEqual("foo");
    expect(identity.concat("foo")).toEqual("foo");
  });
});

describe("List type", () => {
  it("is a semigroup because it has an associative concat method)", () => {
    const result1 = ["foo"].concat(["bar"]).concat(["baz"]);
    const result2 = ["foo"].concat(["bar"].concat(["baz"]));

    expect(result1).toEqual(["foo", "bar", "baz"]);
    expect(result2).toEqual(["foo", "bar", "baz"]);
  });
  it("is a monoid because it has a neutral element", () => {
    const identity: string[] = [];

    expect(["foo"].concat(identity)).toEqual(["foo"]);

    expect(identity.concat(["foo"])).toEqual(["foo"]);
  });
});

describe("All type", () => {
  it("is a semigroup because it has an associative concat method)", () => {
    const result1 = All(true).concat(All(false)).concat(All(true));
    const result2 = All(true).concat(All(false).concat(All(true)));

    expect(JSON.stringify(result1)).toEqual(JSON.stringify(result2));
  });

  it("is a monoid because it has a neutral element", () => {
    const identity = All(true);

    expect(JSON.stringify(All(false).concat(identity))).toEqual(
      JSON.stringify(All(false))
    );
    expect(JSON.stringify(identity.concat(All(false)))).toEqual(
      JSON.stringify(All(false))
    );
  });
});
