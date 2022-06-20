#!/usr/bin/env node
import {} from 'node:child_process'
import gulp = require('gulp')
import webpack = require('webpack')
import { log, shell, taskToPromise } from './utils/index.js'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import type { Config } from '@swc/core'
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin'

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
    optimization: { minimize: false },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new ResolveTypeScriptPlugin()],
    },
    entry: {
        worker: './src/worker',
        siteAdaptor: './src/site-adaptor',
    },
    experiments: {
        backCompat: false,
        outputModule: true,
        topLevelAwait: true,
        futureDefaults: true,
    },
    target: 'es2020',
    output: {
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
    plugins: [],
}

process.addListener('uncaughtException', () => {
    process.exit(1)
})
await taskToPromise(
    gulp.series(log('Type check'), shell`pnpm exec tsc -b tsconfig.json`, log('Bundling'), function () {
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
    }),
)