const enum Default {
  MIN = 0,
  MAX = 100,
}

const sortAscending = (a: number, b: number): number => a - b;

export default class Randomizer {
  static getInteger(min: number = Default.MIN, max: number = Default.MAX): number {
    [min, max] = [min, max].sort(sortAscending);
    min = Math.ceil(min);
    max = Math.ceil(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static get boolean(): boolean {
    const value: number = this.getInteger(0, 1);
    return Boolean(value);
  }

  static getElement<El>(elements: El[] | readonly El[]): El {
    const index: number = this.getInteger(0, elements.length - 1);
    return elements[index];
  }
}
