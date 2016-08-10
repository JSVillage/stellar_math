var config = {
    entry: {
        index: './src/public/js/index.js'
    },
    output: {
        path: './src/public/js/dist/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /.js?$/,
                loader: 'babel',
                exclude: /node_modules|public\/lib/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};

module.exports = config;