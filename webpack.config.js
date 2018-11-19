const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    mode: 'production',
    watch: true,
    watchOptions: {
        ignored: ['node_modules'],
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules|bower_components/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                },
            },
        }, {
            test: /\.less$/,
            exclude: /node_modules|bower_components/,
            use: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[sha1:hash:hex:8]'
                }
            }, {
                loader: 'less-loader'
            }],
        }],
    },
};
