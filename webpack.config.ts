import TsBundleFactory from './scripts/webpack/tsBundleFactory';
import ScssBundleFactory from './scripts/webpack/scssBundleFactory';

module.exports = [
  TsBundleFactory.createCombined(),
  ScssBundleFactory.createCombined(),
  TsBundleFactory.createALaCarte(),
  ScssBundleFactory.createALaCarte()
];
