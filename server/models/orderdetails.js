const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "orderdetails",
    {
      orderDetailNumber: {
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
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "address",
          key: "addressId",
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deliveryStatus: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "orderdetails",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "orderDetailNumber" }],
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
          name: "addressId",
          using: "BTREE",
          fields: [{ name: "addressId" }],
        },
      ],
    }
  );
};
