export const All = (x) => ({
  x,
  concat: ({ x: y }) => All(x && y),
});
