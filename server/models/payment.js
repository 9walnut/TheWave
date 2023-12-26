const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
    paymentId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'orderId'
      }
    },
    payPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    payMethod: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isPaid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isRefund: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "paymentId" },
        ]
      },
      {
        name: "orderId",
        using: "BTREE",
        fields: [
          { name: "orderId" },
        ]
      },
    ]
  });
};
