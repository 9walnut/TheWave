const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "carts",
    {
      cartId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userNumber",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "productId",
        },
      },
      color: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      cartQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isChecked: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "carts",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "cartId" }],
        },
        {
          name: "userNumber",
          using: "BTREE",
          fields: [{ name: "userNumber" }],
        },
        {
          name: "productId",
          using: "BTREE",
          fields: [{ name: "productId" }],
        },
      ],
    }
  );
};
