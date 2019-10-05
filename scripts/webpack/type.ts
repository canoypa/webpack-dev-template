import * as webpack from 'webpack';

type WebpackChunks = string | string[] | webpack.Entry | webpack.EntryFunc;

type WebpackRules = webpack.RuleSetRule[];

export { WebpackChunks, WebpackRules };
