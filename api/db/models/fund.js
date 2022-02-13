const { Sequelize, DataTypes, Model } = require('sequelize')
const Project = require('./project')
const User = require('./user')
// const Project = require('./project')
// const User = require('./user')
// path from seqalize root to db path
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db/makit.db', logging: false })

class Fund extends Model {}

// allowNull defaults to true if not set
Fund.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  // userID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: User,
  //     key: 'id'
  //   }
  // },
  // projectID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: Project,
  //     key: 'id'
  //   }
  // }
}, {
  // Other model options
  sequelize,
  tableName: 'funds',
  timestamps: true,
  modelName: 'Fund'
})
Fund.belongsTo(User, { foreignKey: 'userId' })
// User.hasMany(Fund)

// Fund.belongsTo(Project, { foreignKey: 'projectID' })
Project.hasMany(Fund, { foreignKey: 'projectId' })

Fund.sync({ alter: true }).catch(err => console.log(err))
module.exports = Fund
