type Failure = {
  error: Error;
  index: number;
  isKnown: boolean;
}

export type Report = {
  total: number,
  failures: Failure[]
}