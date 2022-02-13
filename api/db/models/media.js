const { Sequelize, DataTypes, Model } = require('sequelize')
const Project = require('./project')
// const Project = require('./project')
// path from seqalize root to db path
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db/makit.db', logging: false })

class Media extends Model {}

// allowNull defaults to true if not set
Media.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // projectID: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: Project,
  //     key: 'id'
  //   }
  // },
  mediaType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mediaUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options
  sequelize,
  tableName: 'media',
  timestamps: true,
  modelName: 'Media'
})
// Media.belongsTo(Project, { foreignKey: 'projectID' })
Project.hasMany(Media, { foreignKey: 'projectId' })

Media.sync({ alter: true }).catch(err => console.log(err))
module.exports = Media
