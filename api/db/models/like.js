const { Sequelize, DataTypes, Model } = require('sequelize');
const Project = require('./project');
const User = require('./user');
// path from seqalize root to db path
const sequelize = new Sequelize({dialect: 'sqlite', storage: './db/makit.db'});

class Like extends Model {}

// allowNull defaults to true if not set
Like.init({
  // Model attributes are defined here
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {         // User belongsTo Company 1:1
        model: User,
        key: 'id'
    }
  },
  projectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {         // User belongsTo Project 1:1
        model: Project,
        key: 'id'
      }
  }
}, {
    // Other model options
    sequelize,
    tableName: 'likes',
    timestamps: true,
    modelName: 'Like'
});
Like.sync({ force: true })

module.exports = Like