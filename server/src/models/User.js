const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true
    },
    type: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber: DataTypes.STRING,
    emergencyContactName: DataTypes.STRING,
    emergencyNumber: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    }
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (pw) {
    return bcrypt.compareAsync(pw, this.password)
  }

  User.associate = (models) => {
    User.belongsTo(models.Hospital, {
      foreignKey: {
        allowNull: true
      }
    })

    User.hasMany(models.CheckInHistory, {
      allowNull: false,
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
      SourceKey: 'id'
    })

    User.hasOne(models.Address, {
      allowNull: true,
      defaultValue: null,
      onDelete: 'CASCADE',
      foreignKey: 'UserId',
      SourceKey: 'id'
    })
  }

  return User
}
