const { Sequelize, DataTypes, Model } = require('sequelize')
const Project = require('./project')
const User = require('./user')
// path from seqalize root to db path
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db/makit.db', logging: false })

class Comment extends Model {}

// allowNull defaults to true if not set
Comment.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  value: {
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
  tableName: 'comments',
  timestamps: true,
  modelName: 'Comment'
})
Comment.belongsTo(User, { foreignKey: 'userId' })
// User.hasMany(Comment)// perered as assicia

// Comment.belongsTo(Project, { foreignKey: 'projectID' })
Project.hasMany(Comment, { foreignKey: 'projectId' })

Comment.sync({ alter: true }).catch(err => console.log(err))
module.exports = Comment
