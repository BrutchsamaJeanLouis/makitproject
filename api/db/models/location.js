const { Sequelize, DataTypes, Model } = require('sequelize')
const Project = require('./project')
// path from seqalize root to db path
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db/makit.db', logging: false })

class Location extends Model {}

// allowNull defaults to true if not set
Location.init({
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
// Location.belongsTo(Project, { foreignKey: 'projectID' })
Project.hasOne(Location, { foreignKey: 'projectId' })

Location.sync({ alter: true }).catch(err => console.log(err))
module.exports = Location
