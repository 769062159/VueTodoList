const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server.render')
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if(err){throw err}
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  const bunderPath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bunderPath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会儿，别着急...'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router