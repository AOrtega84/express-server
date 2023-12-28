const express = require('express')
const morgan = require('morgan')
const { log } = require('mercedlogger')
const cors = require('cors')

const app = express()

// Database
const db = require('./app/models')
const Role = db.role

// Production
//db.sequelize.sync()

// Development
db.sequelize.sync({ force: true }).then(() => {
    log.red('DATABASE STATUS', 'Drop and Resync DB')
    initial()
})

// Global middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

// App listener
const PORT = process.env.PORT || 8080
app.listen(PORT, () => log.green('SERVER STATUS', `Listening on port ${PORT}`))

function initial() {
    Role.create({
        id: 1,
        name: 'user'
    })

    Role.create({
        id: 2,
        name: 'moderator'
    })

    Role.create({
        id: 3,
        name: 'admin'
    })
}
