import fs from 'fs';

/**
 * @description Execute a
 */
export class Command {
  private fn: Function | null = null;
  private path: string | null = null;
  private data: string | null = null;

  public set setFunction(data: Function) {
    this.fn = data;
  }

  public set setPath(data: string) {
    this.path = data;
  }

  public set setData(data: string) {
    this.data = data;
  }

  public exec() {
    if (!this.fn) return;

    fs.mkdirSync('test');
  }
};
