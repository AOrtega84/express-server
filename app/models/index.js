const config = require('../config/db.config')

const Sequalize = require('sequelize')
const sequelize = new Sequalize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {};

db.Sequalize = Sequalize
db.sequelize = sequelize

db.user = require('./user.model')(sequelize, Sequalize)
db.role = require('./role.model')(sequelize, Sequalize)

db.role.belongsToMany(db.user, {
    through: 'user_roles'
})
db.user.belongsToMany(db.role, {
    through: 'user_roles'
})

db.ROLES = ['user', 'admin', 'moderator']

module.exports = db
