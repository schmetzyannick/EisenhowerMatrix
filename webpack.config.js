const path = require("path");

const webpackConfig = {
    mode: "development",
    name: "server",
    target: "node",
    entry: {
        index: "./backend/src/Server.ts",
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "/dist/backend"),
        devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    },
    devtool: process.env.NODE_ENV === "production" ? undefined : "cheap-source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: [
                   path.join(__dirname, './node_modules'),
                   path.join(__dirname, './frontend'),
                ],
            },
        ],
    },
};
module.exports = webpackConfig;