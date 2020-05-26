import resolve from '@rollup/plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import replace from 'rollup-plugin-replace';

import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';

import postcss from 'rollup-plugin-postcss';
import postCssPresetEnv from 'postcss-preset-env';
// Automatically inline imports
import postCssImport from 'postcss-import';

import { rollupManifest as manifest } from './lib/rollup-manifest';
// import babel              from 'rollup-plugin-babel';
// import { terser }         from 'rollup-plugin-terser'

const dev = 'development';
const prod = 'production';

const parseNodeEnv = (nodeEnv) => (nodeEnv === prod || nodeEnv === dev) ? nodeEnv : dev;
const nodeEnv = parseNodeEnv(process.env.NODE_ENV);

const plugins = [
  /*
  replace({
      // The react sources include a reference to process.env.NODE_ENV
      // so we need to replace it here with the actual value
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
  }),
  */
  // resolve makes rollup look for dependencies in the node_modules directory
  resolve(),
  /*
  commonjs({
    // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
    include: 'node_modules/**',
  }),
  */

  postcss({
    extract: true,
    plugins: [postCssImport, postCssPresetEnv],
    sourceMap: nodeEnv !== prod
    // postcssModulesOptions: { ... }
  }),

  alias({
    entries: [{ find:/^i18n\!(.*)/, replacement: '$1.js' }]
  }),

  typescript(),

  manifest({
    manifestName: './dist/server/public/manifest.json',
    stylesheet: './src/public/css/application.css'
  })
];

if (nodeEnv === prod) {
  plugins.push(babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [["env", { "targets": { "browsers": [
      'Chrome >= 60',
      'Safari >= 10.1',
      'iOS >= 10.3',
      'Firefox >= 54',
      'Edge >= 15'] }, "useBuiltIns": true, "modules": false }]]
  }));
  plugins.push(terser());
  // plugins.push(sizeSnapshot());
}

export default {
  preserveEntrySignatures: false,
  plugins,
  input: './src/public/js/index.ts',
  output: {
    sourcemap: nodeEnv !== prod,
    dir: './dist/server/public/',
    entryFileNames: 'index-[hash].js',
    chunkFileNames: '[name].[hash].js',
    format: 'es'
  },
  watch: {
    include: [
      './src/public/**/*.ts',
      './src/public/**/*.tsx',
      './src/public/**/*.jsx',
      './src/public/**/*.css',
      './src/views/**/*.ejs',
      './src/app/**/*.ts',
      './src/app/**/*.tsx',
      './src/app/**/*.js'
    ]
  }
};
