export enum LookFor {
  NOTHING,
  READ_TO_END,
  READ_TO_SYMBOL_OR_END,
  READ_TO_SYMBOL,
}

export enum Commands {
  MKDIR,
  WRITE_FILE,
  END,
}

/**
 * @description An FileSystemBridge's instruction.
 */
export class Action {
  constructor(
    public readonly word: string,
    public readonly command: Commands,
    public readonly lookFor: LookFor,
  ) {}
}
