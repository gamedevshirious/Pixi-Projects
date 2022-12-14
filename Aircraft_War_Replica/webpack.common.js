const path = require("path");

module.exports = {
  entry: {
    main: "./game.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[contenthash].[ext]",
            outputFolder: "images" 
          }
        }
      }
    ]
  }
};
