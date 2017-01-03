# Fake classnames loader

Generate class name from property or input similar to classnames-loader
but not loading content or processing from actual content.

This make test compilation for css faster.

### Installation

```
npm install --save-dev fake-classnames-loader
```


## Usage

In webpack config
```
{
  test: /\.css$/,
  loader: 'fake-classnames')
}
```

and in js code file

```js
// file.js
import Component from './some/css/Component.css'

console.log(ComponentStyle.class1)
// Output: 'Component_class1'

console.log(ComponentStyle('class1', 'class2'))
// Output: 'Component_class1 Component_class2'
```

## License

ISC
