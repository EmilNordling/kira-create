import fs, { PathLike } from 'fs';
import json5 from 'json5';

export class Locator {
  public static locateDir(path: PathLike) {

  }

  public static dirExists(path: PathLike): boolean {
    if (fs.existsSync(path)) return true;

    console.log(`could not find folder at ${path}`);

    return false;
  }

  /**
   * @description Returns a promise that, if valid, contains parsed JSON5 object.
   */
  public static readJson<T extends Object>(path: PathLike): Promise<T | null> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'UTF8', (error, buffer) => {
        if (error) return reject(null);

        try {
          const parse = json5.parse(buffer)

          resolve(parse);
        } catch (error) {
          reject(null);
        }
      })
    });
  }

  /**
 * @description Returns, if valid, a parsed JSON5 object.
 */
  public static readJsonSync<T extends Object>(path: PathLike): T | null {
    const content = fs.readFileSync(path, 'UTF8');

    if (!content) return null;

    return json5.parse(content);
  }
}
