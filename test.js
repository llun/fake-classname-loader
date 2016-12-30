import webpack from 'webpack'
import test from 'ava'
import MemoryFs from 'memory-fs'
import Module from 'module'

const fs = new MemoryFs()
const output = new Module()
test.before(async t => {
  const compiler = webpack({
    entry: ['./empty.css'],
    output: { filename: 'sample.js', path: '/', libraryTarget: 'commonjs2' },
    module: {
      loaders: [
        { test: /\.css$/,
          loader: require.resolve('./index.js')
        }
      ]
    }
  })
  compiler.outputFileSystem = fs
  await new Promise((resolve, reject) =>
    compiler.run((error) => error ? reject(error) : resolve()))
  output._compile(fs.readFileSync('/sample.js', 'utf8'), 'sample.js')
})

test('generate classname from property', t => {
  const empty = output.exports
  t.is(empty.sample_class, 'empty_sample_class')
})

test('generate classname from input to function', t => {
  const empty = output.exports
  t.is(empty('sample'), 'empty_sample')
})

test('generate multiple classnames from multiple inputs', t => {
  const empty = output.exports
  t.is(empty('class1', 'class2'), 'empty_class1 empty_class2')
})
