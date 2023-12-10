const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "productout",
    {
      productOutId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "orderId",
        },
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "carts",
          key: "cartId",
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
      outStatus: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      outDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "productout",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "productOutId" }],
        },
        {
          name: "orderId",
          using: "BTREE",
          fields: [{ name: "orderId" }],
        },
        {
          name: "cartId",
          using: "BTREE",
          fields: [{ name: "cartId" }],
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
