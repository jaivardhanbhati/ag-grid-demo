module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "dist/bundle.js"
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            /*{
                test: /\.css$/,
                loader: "style!css"
            },*/
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
              test: /\.less$/,
              loader: 'style-loader!css-loader!less-loader'
            },
            {
              test: /\.css$/,
              loader: 'style-loader!css-loader'
            }
        ]
      /* rules: [
          {
            test: /\.less$/,
            use: [
              'style-loader',
              { loader: 'raw-loader', options: { importLoaders: 1 } },
              'less-loader'
            ]
          }
        ]*/
    },
    resolve: {
        alias: {
            "ag-grid-root" : __dirname + "/node_modules/ag-grid"
        }
    }
};
