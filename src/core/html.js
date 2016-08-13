// import yo from 'yo-yo'
// export default yo

var vdom = require('virtual-dom')
var hyperx = require('hyperx')
var hx = hyperx(vdom.h)
// fix for aria and data from https://github.com/substack/hyperx/issues/28
// but svg is broken too
// var hx = require('hyperx')(function (tagName, props, children) {
//   if (!props.attributes) props.attributes = {}
//   Object.keys(props).forEach(function (key) {
//      if (/^aria-/.test(key) || /^data-/.test(key)) props.attributes[key] = props[key]
//   })
//   return vdom.h(tagName, props, children)
// })

export default hx
