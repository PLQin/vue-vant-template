
// github.com/remy/nodemon
var nodemon = require('nodemon')

nodemon({
  script: require.resolve('./index.js'),
  ext: 'js json', // watching extensions
  watch: 'mock/'
})

nodemon.on('start', () => {
  console.log('App has started')
}).on('quit', () => {
  console.log('App has quit')
  process.exit()
}).on('restart', (files) => {
  console.log('App restarted due to: ', files)
})
