/*
  たぶんやってることめも

  tsは普通に取ってきてentry

  ejsはHtmlPluginからエントリー -> entry に入れても処理はできるが名前重複で文句言われるのでダメ
    html-loader の attrs に img:src と link:href を指定してスタイルと画像を読む

  img, style は file-loader でファイル化
    css は extract-loader がいい感じに file-loader が読めるようにしてくれる(htmlも出来る)
*/

const path = require('path'); // path
const merge = require('webpack-merge'); // merge

const glob = require('glob'); // ファイル探し
const HtmlWebpackPlugin = require('html-webpack-plugin'); // ejs用
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // cssを圧縮するやつ
const TerserPlugin = require('terser-webpack-plugin'); // js圧縮用

let entrys = {};
let pug_entries = [];

glob.sync('**/index.ts', { cwd: 'src' }).map(key => (entrys[key.replace(/ts$/, 'js')] = `./src/${key}`));
glob.sync('**/index.pug', { cwd: 'src' }).map(key => {
  ejs_entries.push(
    new HtmlWebpackPlugin({
      inject: false,
      filename: key.replace(/\.pug$/, '.html'),
      template: `./src/${key}`,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  );
});

const fileName = (name, path, space) =>
  `${path
    .replace(`${space}\\src`, '')
    .replace(/([^\\])*$/, '')
    .replace(/\\/g, '/')}${name}`;

const common = {
  entry: {
    ...entrys
  },

  output: {
    filename: '[name]'
  },

  module: {
    rules: [
      // ts
      {
        test: /\.ts$/,
        exclude: /node_modules/, // これいる？
        use: [
          {
            loader: 'babel-loader', // es5に変換
            options: {
              presets: ['@babel/preset-env']
            }
          },
          'ts-loader' // ts読むよ
        ]
      },
      // css
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'index.css',
              outputPath: fileName
            }
          },
          'extract-loader',
          'css-loader', // css読み込み
          'sass-loader' // sassをcssに変換
        ]
      },
      // pug
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader', // html読むよ
            options: {
              attrs: ['img:src', 'link:href']
            }
          },
          {
            loader: 'pug-html-loader', // pug読むよ
            options: {
              basedir: path.resolve(__dirname, 'src')
            }
          }
        ]
      },
      // assets
      {
        test: /\.(png|ico|webp|mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: fileName
          }
        }
      }
    ]
  },

  plugins: [...pug_entries], // pug

  optimization: {
    minimizer: [
      new TerserPlugin({}), // jsのminify
      new OptimizeCSSAssetsPlugin({}) // cssのminify
    ]
  },

  resolve: {
    extensions: ['.ts'],
    alias: {
      root: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets')
    }
  },

  devServer: {
    port: 80,
    contentBase: path.join(__dirname, 'debug')
  }
};
const dev = {
  mode: 'development', // development
  watch: true,
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'debug')
  }
};
const prod = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'build')
  }
};

module.exports = ({ type }) => {
  if (type === 'dev') {
    return merge(common, dev);
  } else if (type === 'prod') {
    return merge(common, prod);
  } else {
    return common;
  }
};
