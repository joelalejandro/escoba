import Card from "./card";

export function* randomSequence(count: number) {
  let index = 0;
  while (index < count) {
    yield { random: Math.random(), index: index++ };
  }
}

/**
 * @see https://stackoverflow.com/a/47147597
 */
export function getAllSubsets<T>(elements: T[]): T[][] {
  return elements.reduce(
    (subsets, value) => subsets.concat(
      subsets.map((set) => [value, ...set]),
    ), [[]],
  );
}

export function sumKeyValue<T>(elements: T[], key: string): number {
  return elements.map(
    (element) => element[key],
  ).reduce((a, b) => a + b, 0);
}

export function sumValues(elements: number[]): number {
  return elements.reduce((a, b) => a + b, 0);
}
