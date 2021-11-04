import resolve     from '@rollup/plugin-node-resolve'
import typescript  from '@rollup/plugin-typescript'
import commonjs    from '@rollup/plugin-commonjs'
import {terser}    from 'rollup-plugin-terser'

const isWatch = process.env.ROLLUP_WATCH || false
const output  = process.env.OUTPUT
const input   = 'src/Kensho.ts'
const config  = {
  input,
  external : [
  ]
}

// =============================================================================
// OUTPUT ESModule
//
if (output === 'es') {
  module.exports = Object.assign({}, config, {
    output : [
      { file : 'dist/bundle.es.js', sourcemap : !isWatch, format : output }
    ],
    plugins : [
      resolve(),
      typescript({
        sourceMap : !isWatch,
        tsconfig  : 'src/tsconfig.json'
      }),
      commonjs({extensions: ['.ts', '.js']})
    ]
  })
}
// =============================================================================
// OUTPUT CommonJS
//
if (output === 'cjs') {
  module.exports = Object.assign({}, config, {
    output : [
      { file : 'dist/bundle.cjs.js', sourcemap : !isWatch, exports : 'auto', format : output }
    ],
    plugins : [
      resolve(),
      typescript({
        tsconfig : 'src/tsconfig.json',
        // module   : 'CommonJS'
      }),
      commonjs({extensions: ['.ts', '.js']})
    ]
  })
}
// =============================================================================
// OUTPUT umd
//
if (output === 'umd') {
  module.exports = Object.assign({}, config, {
    output : [
      { name : 'Kensho', file : 'dist/bundle.umd.js',     sourcemap : !isWatch, format : output },
      { name : 'Kensho', file : 'dist/bundle.umd.min.js', sourcemap : !isWatch, format : output, plugins : [ terser() ] }
    ],
    plugins : [
      resolve(),
      typescript({
        tsconfig : 'src/tsconfig.json'
      }),
      commonjs({extensions: ['.ts', '.js']})
    ]
  })
}
// =============================================================================
// OUTPUT CommonJS
//
if (output === 'iife') {
  module.exports = Object.assign({}, config, {
    output : [
      { name : 'Kensho', file : 'dist/bundle.iife.js',     sourcemap : !isWatch, exports : 'auto', format : output },
      { name : 'Kensho', file : 'dist/bundle.iife.min.js', sourcemap : !isWatch, exports : 'auto', format : output, plugins : [ terser() ] },
    ],
    plugins : [
      resolve(),
      typescript({
        tsconfig : 'src/tsconfig.json',
        target   : 'ES2015'
      }),
      commonjs({extensions: ['.ts', '.js']})
    ]
  })
}