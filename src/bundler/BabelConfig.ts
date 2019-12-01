import { Paths } from '../fileSystem/Paths';
import { TsConfig } from './TsConfig';
import ts = require('typescript');
import { Config } from './Config';

type Entry = [string, { [key: string]: string | boolean | string[] }?];

type PluginList = Entry[];

export class BabelConfig {
  private readonly plugins: PluginList;

  constructor() {
    const paths = Paths.getPaths();

    this.plugins = [
      ['preval'],
      ['@babel/transform-typescript'],
      ['@babel/proposal-decorators', { 'legacy': true }],
      ['module-resolver', {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'root': [paths.rootDir]
      }],
      ['@babel/plugin-proposal-optional-chaining'],
      ['@babel/plugin-proposal-nullish-coalescing-operator'],
      ['@babel/syntax-dynamic-import'],
      ['@babel/proposal-class-properties', { 'loose': true }],
      ['@babel/proposal-object-rest-spread'],
      ['@babel/transform-runtime'],
      ['@babel/proposal-function-sent'],
      ['@babel/proposal-export-namespace-from'],
      ['@babel/proposal-numeric-separator'],
      ['@babel/proposal-throw-expressions'],
      ['@babel/syntax-import-meta'],
      ['@babel/proposal-json-strings'],
      ['@babel/proposal-optional-catch-binding'],
      ['styled-components'],
    ];
  }

  public addBefore(pluginName: string, entry: Entry) {
    const index = this.plugins.findIndex(plugin => plugin[0] === pluginName);

    if (index !== -1) {
      this.plugins.splice(index, 0, entry);
    }
  }

  public addAfter(pluginName: string, entry: Entry) {
    const index = this.plugins.findIndex(plugin => plugin[0] === pluginName);

    if (index !== -1) {
      this.plugins.splice(index + 1, 0, entry);
    }
  }

  public remove(pluginName: string) {
    const index = this.plugins.findIndex(plugin => plugin[0] === pluginName);

    if (index !== -1) {
      this.plugins.splice(index, 1);
    }
  }

  public getConfig() {
    const paths = Paths.getPaths();

    const { target } = TsConfig.getCompilerOptions();

    let targets = {
      edge: '17',
      chrome: '70',
      firefox: '64',
      safari: '11.1',
    };

    if (target === ts.ScriptTarget.ES3) {
      targets = {
        edge: '17',
        chrome: '70',
        firefox: '64',
        safari: '11.1',
      }
    }

    const builder = {
      presets: [
        ['@babel/preset-env', {
          targets,
          modules: false,
        }],
        ['@babel/typescript'],
      ],
      plugins: [...this.plugins],
      "env": {
        "test": {
          presets: [
            ['@babel/preset-env', {
              targets,
              modules: 'commonjs',
            }],
            ['@babel/typescript'],
          ],
        },
      },
    };

    if (Config.isReactProject()) {
      builder.presets.splice(1, 0, ['@babel/react']);
      builder.env.test.presets.splice(1, 0, ['@babel/react']);
      builder.plugins.splice(2, 0, ['react-hot-loader/babel']);
    }

    return builder;
  }
}
