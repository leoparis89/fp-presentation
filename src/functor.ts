export const Box = (x) => ({
  map: (f: Function) => Box(f(x)),
  fold: (f: Function) => f(x),
});

export const Right = (x) => ({
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
});

export const Left = (x) => ({
  map: (f) => Left(x),
  fold: (f, g) => f(x),
});

//tryCatch:: a -> b -> Either b
export const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};
