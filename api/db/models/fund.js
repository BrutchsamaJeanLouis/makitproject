const { Sequelize, DataTypes, Model } = require('sequelize');
const Project = require('./project');
const User = require('./user');
// path from seqalize root to db path
const sequelize = new Sequelize({dialect: 'sqlite', storage: './db/makit.db'});

class Fund extends Model {}

// allowNull defaults to true if not set
Fund.init({
  // Model attributes are defined here
  amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {         // User belongsTo User 1:1
        model: User,
        key: 'id'
      }
  }
}, {
    // Other model options
    sequelize,
    tableName: 'funds',
    timestamps: true,
    modelName: 'Fund'
});
Fund.sync({ force: true })

module.exports = Fund