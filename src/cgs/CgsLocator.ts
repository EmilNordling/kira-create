import fs, { PathLike } from 'fs';
import { Parser } from './Parser';
import { FileSystemBridge } from './FileSystemBridge';

type Spec = {
  noEmit?: boolean;
};

/**
 * @description Locate given .cgs file within the .cgs folder.
 */
export class CgsLocator {
  public readonly noEmit: boolean;

  constructor({ noEmit = false }: Spec) {
    this.noEmit = noEmit;
  }

  public parseCgs(fileToLocate: PathLike) {
    fs.readFile(`${fileToLocate}`, 'utf8', (error, data) => {
      const parser = new Parser();

      try {
        const instructions = parser.interpret(data);

        const bridge = new FileSystemBridge();

        bridge.runInstruction(instructions, this.noEmit);
      } catch(error) {
        console.log(error);
      }
    });
  }


}
