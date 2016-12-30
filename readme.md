# Fake classnames loader

Generate class name from property or input similar to classnames-loader
but not loading content or processing from actual content.


##Example

```js
// file.js
import Component from './some/css/Component.css'

console.log(ComponentStyle.class1)
// Output: 'Component_class1'

console.log(ComponentStyle('class1', 'class2'))
// Output: 'Component_class1 Component_class2'
```
