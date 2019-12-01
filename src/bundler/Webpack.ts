

import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BabelConfig } from './BabelConfig';
import { Paths } from '../fileSystem/Paths';
import { Config } from './Config';

export namespace Webpack {
  interface Rule {
    test: string | RegExp;
    include: string | RegExp;
    exclude?: string | RegExp;
    use: any[];
  }

  interface Base {
    module: {
      rules: Rule[],
    }
    resolve: any;
    performance: any;
    node: any;
  }

  function getBaseConfig(babelConfig: BabelConfig): Base {
    const paths = Paths.getPaths();

    return {
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            include: paths.rootDir,
            exclude: /node_modules/,
            use: [
              { loader: 'cache-loader' },
              {
                loader: 'thread-loader',
                options: {
                  workers: require('os').cpus().length - 1,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  ...babelConfig.getConfig(),
                  cacheDirectory: true,
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      },
      performance: {
        hints: false,
      },
      node: {
        fs: 'empty',
      },
    }
  }

  export class Dev {
    constructor(babelConfig: BabelConfig) {
      const base = getBaseConfig(babelConfig);
      const paths = Paths.getPaths();
      const entries = [];

      if (Config.isReactProject()) {
        base.module.rules.push({
          test: /\.(js|jsx|ts|tsx)$/,
          include: /node_modules/,
          use: ['react-hot-loader/webpack'],
        });

        entries.push(require.resolve('react-hot-loader/patch'), require.resolve('react-dev-utils/webpackHotDevClient'));
      }

      const config = {
        ...base,
        mode: 'development',
        entry: {
          app: [
            ...entries,
            'src',
          ],
        },
        output: {
          path: '/',
          publicPath: 'localhost:8000',
          filename: `bundle-[name].js`
        },
        devtool: 'inline-source-map',
        plugins: [
          new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
          new webpack.NamedModulesPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new CaseSensitivePathsPlugin(),
          new FriendlyErrorsPlugin({}),
          new WatchMissingNodeModulesPlugin(paths.nodeModules),
          new HtmlWebpackPlugin({
            template: paths.html,
            inject: true,
          })
        ],
      }
    }
  }
}

