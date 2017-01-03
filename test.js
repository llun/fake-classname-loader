import webpack from 'webpack'
import test from 'ava'
import MemoryFs from 'memory-fs'
import Module from 'module'

const fs = new MemoryFs()
const output = new Module()
let empty

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
  empty = output.exports
})

test('generate classname from property', t => {
  t.is(empty.sample_class, 'empty_sample_class')
})

test('generate classname from input to function', t => {
  t.is(empty('sample'), 'empty_sample')
})

test('generate multiple classnames from multiple inputs', t => {
  t.is(empty('class1', 'class2'), 'empty_class1 empty_class2')
})

test('generate multiple classnames base on hash', t => {
  t.is(
    empty({ 'class1': true, 'class2': false, 'class3': true }),
    'empty_class1 empty_class3')
})

test('generate multiple classnames from mix input', t => {
  t.is(
    empty('class1', { class2: true, class3: false }),
    'empty_class1 empty_class2')
  t.is(
    empty('class1', { class2: false, class3: true }, 'class4'),
    'empty_class1 empty_class3 empty_class4')
})

