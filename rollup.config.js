import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

export default [
    {
        input: 'src/index.js',
        output: {
            format: 'iife',
            file: 'lib/gedcom.min.js',
            name: 'gedcom'
        },
        plugins: [
            commonjs(),
            babel({ babelHelpers: 'bundled' }),
            terser({
                keep_classnames: true,
                compress: {
                    unsafe: true,
                }
            })
        ]
    },
    {
        input: 'test/parsing.js',
        output: {
            file: 'lib/tests.bundle.js',
        },
        plugins: [
            commonjs()
        ]
    }
];
