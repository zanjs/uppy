// const yo = require('yo-yo')
const { render } = require('preact')

/**
 * Boilerplate that all Plugins share - and should not be used
 * directly. It also shows which methods final plugins should implement/override,
 * this deciding on structure.
 *
 * @param {object} main Uppy core object
 * @param {object} object with plugin options
 * @return {array | string} files or success/fail message
 */
module.exports = class Plugin {

  constructor (core, opts) {
    this.core = core
    this.opts = opts || {}
    this.type = 'none'

    // clear everything inside the target selector
    this.opts.replaceTargetContent === this.opts.replaceTargetContent || true

    this.update = this.update.bind(this)
    this.mount = this.mount.bind(this)
    this.focus = this.focus.bind(this)
    this.install = this.install.bind(this)
  }

  update (state) {
    if (typeof this.el === 'undefined') {
      return
    }

    const newEl = this.render(state)
    // console.log(newEl)
    // console.log(document.querySelector(this.target))
    // console.log(this.el)
    // yo.update(this.el, newEl)
    this.el = render(newEl, document.querySelector(this.target), this.el)
  }

  /**
   * Check if supplied `target` is a `string` or an `object`.
   * If it’s an object — target is a plugin, and we search `plugins`
   * for a plugin with same name and return its target.
   *
   * @param {String|Object} target
   *
   */
  mount (target, plugin) {
    const callerPluginName = plugin.id
    this.target = target

    if (typeof target === 'string') {
      this.core.log(`Installing ${callerPluginName} to ${target}`)

      // clear everything inside the target container
      if (this.opts.replaceTargetContent) {
        document.querySelector(target).innerHTML = ''
      }

      this.el = render(plugin.render(this.core.state), document.querySelector(target))
      // document.querySelector(target).appendChild(this.el)

      return target
    } else {
      // TODO: is instantiating the plugin really the way to roll
      // just to get the plugin name?
      const Target = target
      const targetPluginName = new Target().id

      this.core.log(`Installing ${callerPluginName} to ${targetPluginName}`)

      const targetPlugin = this.core.getPlugin(targetPluginName)
      const selectorTarget = targetPlugin.addTarget(plugin)

      return selectorTarget
    }
  }

  focus () {
    return
  }

  install () {
    return
  }
}
