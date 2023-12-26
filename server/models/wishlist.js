const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wishlist', {
    wishNumber: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'productId'
      }
    },
    userNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
          { name: "wishNumber" },
        ]
      },
      {
        name: "productId",
        using: "BTREE",
        fields: [
          { name: "productId" },
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
