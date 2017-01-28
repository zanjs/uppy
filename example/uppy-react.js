const React = require('react')
const ReactDOM = require('react-dom')
const Uppy = require('../src/core/Core')
const Tus10 = require('../src/plugins/Tus10')
const DragDrop = require('../src/plugins/DragDrop')

/*
 * A simple React component that works with Uppy
 */

class UppyDragDrop extends React.Component {
  componentDidMount () {
    var node = this.refs.rootNode
    node.className = '_drap_drop_' + (Math.random() * 1e9 | 0)

    this.props.uppy.use(DragDrop, {
      target: '.' + node.className
    })
  }

  render () {
    return <div ref='rootNode' />
  }
}

class Application extends React.Component {
  constructor () {
    super()
    this.state = {
      images: []
    }
    this.uppy = new Uppy({debug: true, autoProceed: false})
    this.uppy.use(Tus10, {
      endpoint: 'http://master.tus.io:8080/files/'
    })

    console.log(this.uppy)

    this.upload = this.upload.bind(this)

    this.uppy.on('core:upload-success', (fileID, uploadURL) => {
      console.log(fileID, uploadURL)
      const newImgArray = this.state.images.slice()
      newImgArray.push(uploadURL)
      this.setState({
        images: newImgArray
      })
    })

    this.uppy.on('core:upload-progress', () => {
      const newProgress = this.uppy.getState().totalProgress
      this.setState({
        progress: newProgress
      })
    })
  }

  componentDidMount () {
    this.uppy.run()
  }

  upload () {
    this.uppy.emitter.emit('core:upload')
  }

  render () {
    return <div>
      {/* <h1>Hello, I am a React app working with Uppy, much wow</h1>
      <input type="file" multiple onChange={(ev) => this.addFile(ev)} />
      <br/><br/> */}

      <UppyDragDrop uppy={this.uppy} />
      <button type='button' onClick={this.upload}>Upload</button>
      <br/><br/>
      <h4>{this.state.progress || null}</h4>
      <br/><br/>
      {this.state.images.map((img) => {
        return <img width='200' src={img}/>
      })}
    </div>
  }
}

ReactDOM.render(<Application />, document.querySelector('#uppyReact'))

module.exports = {
  Application,
  UppyDragDrop
}
