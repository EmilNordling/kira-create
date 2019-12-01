import { Action, LookFor, Commands } from './Action';
import { rules } from './Rule';

const SymbolStrings = [
  '@{',
  '}@',
  '@',
];

type Spec = {
  parent: Action | null,
  startIndex: number,
  endIndex: number,
  find?: string | null,
};

/**
 * @description Regex match a string between indexes.
 */
export class Reader {
  public readonly parent: Action | null = null;
  public readonly startIndex: number = 0;
  public readonly endIndex: number = 0;

  constructor({
    parent,
    startIndex,
    endIndex,
    find = null,
  }: Spec) {
    this.parent = parent;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  public read(str: string): [Action, number] {
    const readSpan = str.substring(this.startIndex, this.endIndex);

    for (const rule of rules) {
      const matcher = rule.pattern.exec(readSpan);

      if (matcher !== null) {
        return [new Action(matcher[0], rule.command, rule.influence), matcher[0].length];
      }
    }

    // No matching rule found, checks if parent has a READ_TO... flag.
    if (this.parent && this.parent.lookFor !== LookFor.NOTHING) {
      if (this.parent.lookFor === LookFor.READ_TO_END) {
        return [new Action(readSpan, Commands.END, LookFor.NOTHING), readSpan.length];
      }
    }

    throw new Error('wtf');
  }
}
