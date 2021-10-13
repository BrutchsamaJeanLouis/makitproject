const { Sequelize, DataTypes, Model } = require('sequelize')
const Project = require('./project')
// path from seqalize root to db path
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db/makit.db' })

class Location extends Model {}

// allowNull defaults to true if not set
Location.init({
  // Model attributes are defined here
  projectID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postcode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options
  sequelize,
  tableName: 'locations',
  timestamps: true,
  modelName: 'Location'
})
Location.sync({ alter: true })

module.exports = Location
