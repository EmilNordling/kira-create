import ts from 'typescript';
import { Locator } from '../fileSystem/Locator';
import { Paths } from '../fileSystem/Paths';

type ParsedCompilerOptions = {
  target: ts.ScriptTarget;
  module: string;
  lib: string;
  outDir: string;
  rootDir: string;
  paths: { [key: string]: string };
  baseUrl: string;
};

type CompilerOptionsLike = {
  [key: string]: any;
};

type TsConfigLike = {
  compilerOptions: CompilerOptionsLike;
};

export namespace TsConfig {
  let options: Readonly<ParsedCompilerOptions> | null = null;

  const targets = {
    es3: ts.ScriptTarget.ES3,
    es5: ts.ScriptTarget.ES5,
    es6: ts.ScriptTarget.ES2015,
    es2015: ts.ScriptTarget.ES2015,
    es2016: ts.ScriptTarget.ES2016,
    es2017: ts.ScriptTarget.ES2017,
    es2018: ts.ScriptTarget.ES2018,
    es2019: ts.ScriptTarget.ES2019,
    es2020: ts.ScriptTarget.ES2020,
    esnext: ts.ScriptTarget.ESNext,
  };

  export function getCompilerOptions(): ParsedCompilerOptions {
    if (options !== null) return options;

    const tsconfig = Locator.readJsonSync<TsConfigLike>(`${Paths.root}/tsconfig.json`);

    if (tsconfig) {
      options = parseTypeScriptCompilerOptions(tsconfig.compilerOptions);
    }

    if (!options) options = parseTypeScriptCompilerOptions({});

    return options;
  }

  export function parseTypeScriptCompilerOptions(compilerOptions: CompilerOptionsLike): Readonly<ParsedCompilerOptions> {
    let builder: ParsedCompilerOptions = {
      // Defaults
      baseUrl: '/',
      outDir: 'dist',
      rootDir: 'src',
      lib: '',
      module: '',
      paths: {},
      target: ts.ScriptTarget.ES2019,
    };

    if (compilerOptions.target) {
      const target = compilerOptions.target as keyof typeof targets;

      if (typeof targets[target] !== 'undefined') {
        builder.target = targets[target];
      }
    }

    if (compilerOptions.rootDir) {
      builder.rootDir = compilerOptions.rootDir;
    }

    if (compilerOptions.outDir) {
      builder.outDir = compilerOptions.outDir;
    }

    Object.freeze(builder);

    return builder;
  }
}
