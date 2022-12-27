import { readFileSync } from 'fs';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';
import scss from 'rollup-plugin-scss';
import typescript from '@rollup/plugin-typescript';

const pkg = JSON.parse(readFileSync('./package.json'));

const basePlugins = [
  typescript(),
  json(),
  commonjs(),
  resolve(),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  filesize(),
  scss({ fileName: `${pkg.name}.css`, outputStyle: 'compressed' }),
];

const globals = {
  '@popperjs/core': 'Popper',
  'd3-selection': 'd3',
  'd3': 'd3',
  'd3-array': 'd3',
  'd3-color': 'd3',
  'd3-fetch': 'd3',
  'd3-format': 'd3',
  'd3-scale': 'd3',
  'd3-selection': 'd3',
  'd3-transition': 'd3',
};

const exportConfig = (input, name, output, options = {}) => {
  return [
    {
      input,
      output: [
        {
          file: `dist/${output}.js`,
          name,
          format: 'umd',
          globals,
        },
      ],
      plugins: basePlugins,
      ...options
    },
    {
      input,
      watch: false,
      output: [
        {
          file: `dist/${output}.esm.js`,
          format: 'esm',
          globals,
        },
      ],
      plugins: basePlugins,
      ...options
    },
    {
      input,
      watch: false,
      output: [
        {
          compact: true,
          file: `dist/${output}.min.esm.js`,
          format: 'esm',
          sourcemap: true,
          globals,
        },
        {
          compact: true,
          file: `dist/${output}.min.js`,
          name,
          format: 'umd',
          sourcemap: true,
          globals,
        },
      ],
      plugins: [...basePlugins, terser()],
      ...options
    },
  ]
}

export default [
  ...exportConfig('src/CalHeatmap.ts', 'CalHeatmap', pkg.name, { external: ['d3', 'd3-array', 'd3-color', 'd3-fetch', 'd3-format', 'd3-scale', 'd3-selection', 'd3-transition'] }),
  ...exportConfig('src/plugins/Tooltip.ts', 'Tooltip', 'plugins/Tooltip', { external: ['@popperjs/core'] }),
  ...exportConfig('src/plugins/Legend.ts', 'Legend', 'plugins/Legend', { external: ['d3-selection', 'd3'] }),
];
