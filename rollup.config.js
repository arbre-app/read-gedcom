import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
//import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            strict: false
        },
        {
            file: pkg.module,
            format: 'esm',
            exports: 'named',
            sourcemap: true
        },
        {
            file: pkg.browser,
            format: 'umd',
            name: 'gedcom',
            sourcemap: true
        }
    ],
    plugins: [
        babel({ babelHelpers: 'bundled' }),
        /*terser({
            keep_classnames: true, // Preserve class & function names
            keep_fnames: true,
            compress: {
                unsafe: true,
            }
        }),*/
        commonjs()
    ]
};
