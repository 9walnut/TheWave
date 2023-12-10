const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userNumber: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    passwordSalt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "N"
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userNumber" },
        ]
      },
    ]
  });
};
