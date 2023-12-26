const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wishlist', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'productId'
      }
    },
    userNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'userNumber'
      }
    }
  }, {
    sequelize,
    tableName: 'wishlist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" },
          { name: "userNumber" },
        ]
      },
      {
        name: "userNumber",
        using: "BTREE",
        fields: [
          { name: "userNumber" },
        ]
      },
    ]
  });
};
