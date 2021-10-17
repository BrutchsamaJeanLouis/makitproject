const { Sequelize, DataTypes, Model } = require('sequelize')
// const Comment = require('./comment')
// const Fund = require('./fund')
// const Project = require('./project')
// const Rating = require('./rating')
// path from seqalize root to db path
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db/makit.db' })
// sequelize.query('PRAGMA journal_mode=WAL;')
// add logging: false to paramterized constructor of sequalize to disable logging

class User extends Model {}

// allowNull defaults to true if not set
// const User = sequelize.define('User', {
User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
    // defaultValue: "John Doe"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize,
  tableName: 'users',
  timestamps: true,
  modelName: 'User'
})

User.sync({ alter: true })

module.exports = User
