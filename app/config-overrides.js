const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override (config, env) {
    if (env === 'development') {
        // https://github.com/cdharris/react-app-rewire-hot-loader/issues/23#issuecomment-485193878
        config.resolve.alias['react-dom'] = '@hot-loader/react-dom';

        config.module.rules.unshift({
            test: /\.jsx?$/,
            enforce: 'pre',
            use: [
                {
                    loader: require.resolve('prettier-loader'),
                    options: {
                        resolveConfigOptions: {
                            editorconfig: true,
                            config: './.prettierrc.json',
                        },
                    },
                },
            ],
            exclude: /node_modules/,
        });
    }

    return rewireReactHotLoader(config, env);
};
