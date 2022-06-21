#!/usr/bin/env node
import gulp = require('gulp')
import webpack = require('webpack')
import { log, shell, taskToPromise } from './utils/index.js'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import type { Config } from '@swc/core'
import CopyPlugin = require('copy-webpack-plugin')
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin'
import { manifest, packageJSON } from './manifest.js'
import { ManifestPlugin } from './manifest-plugin.js'

const require = createRequire(import.meta.url)

const config: webpack.Configuration = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: require.resolve('swc-loader'),
                options: {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                            dynamicImport: true,
                            tsx: true,
                        },
                        target: 'es2021',
                        transform: {
                            react: {
                                runtime: 'automatic',
                                // refresh: true,
                            },
                        },
                        experimental: {
                            keepImportAssertions: true,
                        },
                    },
                } as Config,
            },
        ],
    },
    optimization: {
        minimize: false,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '-',
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new ResolveTypeScriptPlugin()],
        fallback: {},
    },
    entry: manifest.entries,
    experiments: {
        backCompat: false,
        outputModule: true,
        topLevelAwait: true,
        futureDefaults: true,
    },
    target: ['es2020', 'web'],
    output: {
        clean: true,
        path: join(process.cwd(), 'dist/bundle'),
        chunkFormat: 'module',
        chunkLoading: 'import',
        environment: {
            module: true,
        },
        library: {
            type: 'module',
        },
    },
    externals: [
        'react',
        'react/jsx-runtime',
        /@masknet\/plugin.?/,
        '@masknet/icons',
        '@masknet/theme',
        '@masknet/base',
        /@mui\/.+/,
        'ts-results',
    ],
    plugins: [
        new ManifestPlugin(manifest, packageJSON),
        manifest.i18n?.files
            ? new CopyPlugin({
                  patterns: [
                      {
                          from: manifest.i18n.files + '/*.json',
                          to: 'locales/[name][ext]',
                      },
                  ],
              })
            : undefined!,
    ].filter(Boolean),
}

process.addListener('uncaughtException', () => {
    process.exit(1)
})
await taskToPromise(
    gulp.series(
        //
        log('Type check'),
        //
        shell`pnpm exec tsc -b tsconfig.json`,
        log('Bundling'),
        bundle,
    ),
)

function bundle() {
    return new Promise<void>((resolve, reject) => {
        webpack(config, (err, stats) => {
            const statStr = stats?.toString({ colors: true })
            statStr && console.log(statStr)
            if (err || stats?.hasErrors()) {
                reject(err || new Error())
            }
            resolve()
        })
    })
}
