const { Sequelize, DataTypes, Model } = require('sequelize')
const User = require('./user')
// const Fund = require('./fund')
// const Media = require('./media')
// const Rating = require('./rating')
// const Location = require('./location')
// const Comment = require('./comment')
// path from seqalize root to db path
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db/makit.db', logging: false })

class Project extends Model {}

// allowNull defaults to true if not set
Project.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
    // defaultValue: "John Doe"
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
  // userID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: User,
  //     key: 'id'
  //   }
  // }
}, {
  // Other model options
  sequelize,
  tableName: 'projects',
  timestamps: true,
  modelName: 'Project'
})
Project.belongsTo(User, { foreignKey: 'userId' })
// Project.hasOne(User)

Project.sync({ alter: true }).catch(err => console.log(err))
module.exports = Project
