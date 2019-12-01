import { Action, Commands } from './Action';
import { Command } from './Command';
import fs from 'fs';

export type Instructions = Action[];

/**
 * @description Emit files
 */
export class FileSystemBridge {
  constructor() {

  }

  public runInstruction(instructions: Instructions, noEmit = false): void {
    const command = new Command();

    // Command builder
    for (const instruction of instructions) {
      switch (instruction.command) {
        case Commands.MKDIR:
          command.setFunction = fs.mkdir;
          break;
        default:
      }
    }

    if (noEmit) return;

    command.exec();
  }
}
