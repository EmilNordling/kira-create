import { Action, LookFor, Commands } from './Action';

enum Type {
  KEYWORD,
  FOLDER,
}

interface Rule {
  readonly pattern: RegExp,
  readonly type: Type,
  readonly influence: LookFor,
  readonly command: Commands,
}

class Folder implements Rule {
  pattern = /^folder[\s]?/;
  type = Type.KEYWORD;
  influence = LookFor.READ_TO_END;
  command = Commands.MKDIR;
}

class Create implements Rule {
  pattern = /^create[\s]?/;
  type = Type.KEYWORD;
  influence = LookFor.NOTHING;
  command = Commands.WRITE_FILE;
}

export const rules = [
  new Folder(),
  new Create(),
];
