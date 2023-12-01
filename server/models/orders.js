const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    orderId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userNumber'
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'address',
        key: 'addressId'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderId" },
        ]
      },
      {
        name: "userNumber",
        using: "BTREE",
        fields: [
          { name: "userNumber" },
        ]
      },
      {
        name: "addressId",
        using: "BTREE",
        fields: [
          { name: "addressId" },
        ]
      },
    ]
  });
};
