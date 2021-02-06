export const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
});

export const Left = (x) => ({
  chain: (f) => Left(x),
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

export const IO = (f) => ({
  map: (g) => IO(() => g(f())),
  fold: (g) => g(f()),
});
