import * as webpack from 'webpack';

import BundleFactory from './bundleFactory';
import pathResolver from '../util/pathResolver';

import { ConfigOpt } from './type';

class TsBundleFactory implements BundleFactory {
  createConfig(opt: ConfigOpt): webpack.Configuration {
    return {
      mode: 'production',

      output: { filename: '[name].js', path: opt.output, library: 'lib', libraryTarget: 'umd' },

      entry: opt.chunks,

      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: ['ts-loader']
          }
        ]
      },

      resolve: { extensions: ['.ts'] },

      devtool: 'source-map'
    };
  }

  createCombined(): webpack.Configuration {
    const output = pathResolver.get('./build/Combined');
    const chunks = pathResolver.getFromSrc('./index.ts');

    return this.createConfig({ output, chunks });
  }

  createALaCarte(): webpack.Configuration {
    const output = pathResolver.get('./build/Combined');
    const chunks = {
      chunk: pathResolver.getFromSrc('./chunk/index.ts')
    };

    return this.createConfig({ output, chunks });
  }
}

export default TsBundleFactory;
