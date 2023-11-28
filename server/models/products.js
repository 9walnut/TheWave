const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    productID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'categoryID'
      }
    },
    productName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productInfo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    productStatus: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productID" },
        ]
      },
      {
        name: "categoryID",
        using: "BTREE",
        fields: [
          { name: "categoryID" },
        ]
      },
    ]
  });
};
