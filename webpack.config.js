module.exports = {
    entry: './app/App.jsx',
    devtool: 'source-map',
    output: {
        path: __dirname+'/public/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
              test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader',
              query: {
                plugins: ['transform-es2015-parameters', 'transform-object-rest-spread'],
                presets: ['react', 'es2015']
              }
           }
        ]
    }
};
