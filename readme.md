# Dev Temp

自分用web開発環境のテンプレート

フロントエンドようわからん いい本あったら教えて欲しい


・たぶんやってることめも

    glob で ts, ejs を探す
      ts はそのまま entry に
      ejs は HtmlWebpackPlugin に

      ejs を entry に入れても処理はできるが名前重複で文句言われるのでダメ

    ts -> ts-loader を通して babel-loader でes5に
    scss -> sass-loader, css-loader を通してから extract-loader, file-loader でファイル出力
    ejs -> ejs-html-loader, html-loader を通す
      html-loader の attrs に img:src と link:href を指定してスタイルと画像を読む
    assets -> file-loader でファイル化
