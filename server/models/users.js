const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      userNumber: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      passwordSalt: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.CHAR(11),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      gender: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "userNumber" }],
        },
      ],
    }
  );
};
