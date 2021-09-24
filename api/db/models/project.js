const { Sequelize, DataTypes, Model } = require('sequelize');
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
      allowNull: true
  }
}, {
    // Other model options go here
    sequelize,
    tableName: 'projects',
    timestamps: true,
    modelName: 'Project'
});
Project.sync({ alter: true })

module.exports = Project