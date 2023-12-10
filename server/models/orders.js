const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "orders",
    {
      orderId: {
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
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      orderQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      receiveName: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      deliveryRequest: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      orderDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      orderStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      changeDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "orders",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "orderId" }],
        },
        {
          name: "userNumber",
          using: "BTREE",
          fields: [{ name: "userNumber" }],
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
