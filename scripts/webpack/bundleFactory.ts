import * as webpack from 'webpack';
import { ConfigOpt } from './type';

interface BundleFactory {
  createConfig(opt: ConfigOpt): webpack.Configuration;

  createCombined(): webpack.Configuration;
  createALaCarte(): webpack.Configuration;
}

export default BundleFactory;
