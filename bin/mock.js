const exec = require('child_process').execSync
exec('npm run mock:serve', { stdio: 'inherit' })
