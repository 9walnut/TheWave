const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productoption', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'productId'
      }
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    size: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    deliveryHope: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'productoption',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
    ]
  });
};
