const React = require('react')

class UppyDashboard extends React.Component {
  componentDidMount () {
    console.log(this.target)
    // this.node = this.refs.rootNode
    // var trigger = this.refs.trigger
    // node.className = '_uppy_' + (Math.random() * 1e9 | 0)
    // trigger.className = '_uppy_' + (Math.random() * 1e9 | 0)

    // this.props.uppy.use(Dashboard, {
    //   target: '.' + this.target,
    //   trigger: '.' + this.trigger
    // })
  }

  // shouldComponentUpdate () {
  //   return false
  // }

  render () {
    console.log(this.props.rootClassName)
    console.log(this.props.triggerClassName)
    return <div className={this.props.rootClassName}>
      <button className={this.props.triggerClassName}>
        {this.props.triggerText}
      </button>
    </div>
  }
}

module.exports = UppyDashboard
