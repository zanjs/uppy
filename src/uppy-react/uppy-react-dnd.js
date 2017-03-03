const React = require('react')
const DragDrop = require('../plugins/DragDrop')

class UppyDragDrop extends React.Component {
  componentDidMount () {
    var node = this.refs.rootNode
    node.className = '_uppy_' + (Math.random() * 1e9 | 0)

    this.props.uppy.use(DragDrop, {
      target: '.' + node.className
    })
  }

  render () {
    return <div className={'_uppy_' + (Math.random() * 1e9 | 0)} ref="rootNode" />
  }
}

module.exports = UppyDragDrop
