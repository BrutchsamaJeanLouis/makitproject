const { Sequelize, DataTypes, Model } = require('sequelize');
const Fund = require('./fund');
// path from seqalize root to db path
const sequelize = new Sequelize({dialect: 'sqlite', storage: './db/makit.db'});

class Project extends Model {}

// allowNull defaults to true if not set
Project.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
    // defaultValue: "John Doe"
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fundID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {         // User belongsTo Fund 1:1
        model: Fund,
        key: 'id'
      }
  }
}, {
    // Other model options
    sequelize,
    tableName: 'projects',
    timestamps: true,
    modelName: 'Project'
});
Project.sync({ alter: true })

module.exports = Project