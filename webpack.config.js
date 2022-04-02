const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const fs = require("fs");
const webpack = require("webpack");
const console = require("console");

if (!fs.existsSync(path.join(__dirname, "backend", "env.json"))) {
    fs.writeFileSync(path.join(__dirname, "backend", "env.json"), "{}");
}

const webpackConfig = {
    name: "server",
    target: "node",
    externals: [nodeExternals()],
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
                exclude: [path.join(__dirname, "./node_modules"), path.join(__dirname, "./frontend")],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            fs: false,
            net: false,
        },
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "backend", "env.json"),
                    to: path.join(__dirname, "dist", "backend", "env.json"),
                },
            ],
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
    ],
};
module.exports = webpackConfig;
