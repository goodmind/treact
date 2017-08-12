
import { map, pipe, splitEvery } from 'ramda';

export default class Color {
  private data: Uint8ClampedArray;
  get r(): number {
    return this.data[0];
  }
  get g(): number {
    return this.data[1];
  }
  get b(): number {
    return this.data[2];
  }
  get a(): number {
    return this.data[3];
  }
  constructor(data: number[]) {
    if (data.length !== 4) {
      throw new TypeError(`Color data error: ${data} should have length 4`);
    }
    this.data = Uint8ClampedArray.from(data);
  }

  public toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${+(this.a / 255).toFixed(2)})`;
  }
  public inspect() {
    return `Color ${this.toString()}`;
  }

  public static of(color: string) {
    return new Color(fromString(color));
  }
}

const fromString: (str: string) => number[] = pipe(
  splitEvery(2),
  map( color => parseInt(color, 16) ),
);
