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
        allowNull: false,
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
          name: "productId",
          using: "BTREE",
          fields: [{ name: "productId" }],
        },
      ],
    }
  );
};
