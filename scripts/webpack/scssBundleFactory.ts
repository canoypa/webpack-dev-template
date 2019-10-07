import * as webpack from 'webpack';

import BundleFactory from './bundleFactory';
import pathResolver from '../util/pathResolver';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { ConfigOpt } from './type';

class ScssBundleFactory implements BundleFactory {
  static createConfig(opt: ConfigOpt): webpack.Configuration {
    return {
      mode: 'production',

      output: {
        filename: 'none', // css の出力が js ファイルを上書きするのを防止する (css ファイルは MiniCssExtractPlugin が出力)
        path: opt.output
      },

      entry: opt.chunks,

      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          }
        ]
      },

      plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],

      resolve: { extensions: ['.scss'] }
    };
  }

  static createCombined(): webpack.Configuration {
    const output = pathResolver.get('./build/Combined');
    const chunks = pathResolver.getFromSrc('./index.scss');

    return this.createConfig({ output, chunks });
  }

  static createALaCarte(): webpack.Configuration {
    const output = pathResolver.get('./build/Combined');
    const chunks = {
      chunk: pathResolver.getFromSrc('./chunk/index.scss')
    };

    return this.createConfig({ output, chunks });
  }
}

export default ScssBundleFactory;
