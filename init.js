const fs = require('fs')

fs.copyFileSync('.env.sample', '.env')

// Создание папки tmp/pgdata
fs.mkdirSync('tmp/pgdata', { recursive: true })

// Создание папки tmp/pgadmin
fs.mkdirSync('tmp/pgadmin', { recursive: true })
