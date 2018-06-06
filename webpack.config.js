// entry -> output
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test'});
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development'});
}

module.exports = (env) => {
     const isProduction = env === 'production';
     const CSSExtract = new ExtractTextPlugin('styles.css');
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                soourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                soourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'proces.env.FIRESBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'proces.env.FIRESBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'proces.env.FIRESBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'proces.env.FIRESBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'proces.env.FIRESBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'proces.env.FIRESBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            //handle api routing via client side code
            historyApiFallback: true, 
            publicPath: '/dist'
        }
    };
};

//loader, running files through babel, converting jsk to js, es5 to es6/7
