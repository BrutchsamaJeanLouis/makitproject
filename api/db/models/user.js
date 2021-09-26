const { Sequelize, DataTypes, Model } = require('sequelize');
// path from seqalize root to db path
const sequelize = new Sequelize({dialect: 'sqlite', storage: './db/makit.db'});

class User extends Model {}

// allowNull defaults to true if not set
// const User = sequelize.define('User', {
User.init({
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false
    // defaultValue: "John Doe"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
      type: DataTypes.STRING,
      allowNull: true
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  salt: {
      type: DataTypes.STRING,
      allowNull: false
  }
}, {
    // Other model options go here
    sequelize,
    tableName: 'users',
    timestamps: true,
    modelName: 'User'
});
User.sync({ force: true })

// const testSave = async () => {
//     const sama = User.build({
//         username: 'samaTest',
//         password: '1234',
//         email: 'fwfefve',
//         salt: 'evdmvk',
//     })

//     sama.save().then(console.log('sucessfully saved test user'))
//     console.log(sama instanceof User); // true
//     console.log(sama.username);
// }
// // `sequelize.define` also returns the model
// testSave()

module.exports = User