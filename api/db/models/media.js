const { Sequelize, DataTypes, Model } = require('sequelize')
const Project = require('./project')
// path from seqalize root to db path
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db/makit.db' })

class Media extends Model {}

// allowNull defaults to true if not set
Media.init({
  // Model attributes are defined here
  projectID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  },
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
Media.sync({ alter: true })

module.exports = Media
