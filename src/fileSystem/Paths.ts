import path from 'path';
import fs, { PathLike } from 'fs';
import { TsConfig } from '../bundler/TsConfig';

type PathList = {
  publicPath: string;
  outDir: string;
  rootDir: string;
  dir: string;
  html: string;
  index: string;
  packageJson: string;
  nodeModules: string;
};

export namespace Paths {
  export const root = fs.realpathSync(process.cwd());

  let paths: Readonly<PathList> | null = null;

  export function getPaths(): Readonly<PathList> {
    const { outDir, rootDir } = TsConfig.getCompilerOptions();

    if (paths === null) {
      paths = {
        publicPath: Paths.root,
        dir: resolveRelative('public'),
        outDir: resolveRelative(outDir),
        rootDir: resolveRelative(rootDir),
        html: resolveRelative('public/index.html'),
        index: resolveRelative(`${rootDir}/index.tsx`),
        packageJson: resolveRelative('package.json'),
        nodeModules: resolveRelative('node_modules'),
      };

      Object.freeze(paths);
    }

    return paths;
  }

  function resolveRelative(location: string) {
    return path.resolve(root, location);
  }
}

