module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@api': './src/api',
                    '@type': './src/types',
                    '@components': './src/components',
                    '@pages': './src/pages',
                    '@constants': './src/constants',
                    '@helpers': './src/helpers',
                },
            },
        ],
    ],
};
