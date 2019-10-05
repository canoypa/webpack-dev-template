import * as webpack from 'webpack';
import { WebpackChunks, WebpackRules } from './type';

abstract class BundleFactory {
  createConfig(): webpack.Configuration {}

  createCombined(): webpack.Configuration {
    return this.createConfig();
  }
  createALaCarte(): webpack.Configuration {
    return this.createConfig();
  }

  abstract getChunks(): WebpackChunks;

  abstract getRules(): WebpackRules;
}

export default BundleFactory;
