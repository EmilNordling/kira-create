import { Reader } from './Reader';
import { Instructions } from './FileSystemBridge';

/**
 * @description Parses .cgs files down to FileSystem instructions.
 */
export class Parser {
  /**
   * @description Builds a list of FileSystem instructions.
   */
  public interpret(utf8File: string): Instructions {
    const split = utf8File.split(/\r?\n/);

    const commands = [];

    const lineIndex = 0;

    const instructions = this.parse(split[0]);

    return instructions;
  }

  /**
   * @description Parse will requestytxi strings until satisfied.
   */
  private parse(source: string): Instructions {
    const remainingParses = [];
    let offset = 0;

    if (source.length !== 0) {
      remainingParses.push(new Reader({
        parent: null,
        startIndex: offset,
        endIndex: source.length,
      }));
    }

    let instructions = [];
    let instructionIndex = 0;

    while (remainingParses.length !== 0) {
      // Explicitly types this since it'll never return undefined.
      const spec = <Reader>remainingParses.pop();

      if (offset >= source.length) {
        break;
      }

      const [result, addedOffset] = spec.read(source);

      instructions.push(result);
      offset += addedOffset;

      remainingParses.push(new Reader({
        parent: instructions[instructionIndex] || null,
        startIndex: offset,
        endIndex: source.length,
      }));

      instructionIndex++;
    }

    return instructions;
  }

  public static findWords(str: string) {
    console.log(str);
  }
}
