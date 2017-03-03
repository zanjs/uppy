const React = require('react')
const ReactDOM = require('react-dom')
const Uppy = require('../core/Core')
const Tus10 = require('../plugins/Tus10')
const Dashboard = require('../plugins/Dashboard')
const UppyDashboard = require('./uppy-react-dashboard.js')

const PROTOCOL = location.protocol === 'https:' ? 'https' : 'http'
const TUS_ENDPOINT = PROTOCOL + '://master.tus.io/files/'

/*
 * A simple React component that works with Uppy
 */

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      images: []
    }

    this.rootClassName = '_uppy_' + (Math.random() * 1e9 | 0)
    this.triggerClassName = '_uppy_' + (Math.random() * 1e9 | 0)

    this.upload = this.upload.bind(this)
  }

  componentDidMount () {
    this.uppy = new Uppy({debug: true, autoProceed: false})
    this.uppy.use(Dashboard, {
      target: '.' + this.rootClassName,
      trigger: '.' + this.triggerClassName
    })
    this.uppy.use(Tus10, {
      endpoint: TUS_ENDPOINT
    })

    this.uppy.run()

    this.uppy.on('core:upload-success', (fileID, upload) => {
      const newImgArray = this.state.images.slice()
      newImgArray.push({id: fileID, url: upload.url})

      const newProgress = this.uppy.getState().totalProgress

      this.setState({
        images: newImgArray,
        progress: newProgress
      })
    })

    this.uppy.on('core:upload-progress', () => {
      const newProgress = this.uppy.getState().totalProgress
      this.setState({
        progress: newProgress
      })
    })
  }

  upload () {
    this.uppy.emitter.emit('core:upload')
  }

  openDashboard () {
    this.uppy.plugins.dashboard.showModal()
  }

  onProgress (progress) {

  }

  onSuccess (result) {

  }

  render () {
    return <div>
      <UppyDashboard uppy={this.uppy}
                     rootClassName={this.rootClassName}
                     triggerClassName={this.triggerClassName}
                     triggerText="Select file"
                     onProgress={this.onProgress}
                     onSuccess={this.onSuccess} />

      <br/><br/>
      <h4>{this.state.progress || null}</h4>
      <br/><br/>

      {this.state.images.map((img, i) => {
        return <img key={img.id} width='200' src={img.url}/>
      })}
    </div>
  }
}

ReactDOM.render(<App />, document.querySelector('#uppyReact'))
