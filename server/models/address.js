const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    addressId: {
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
    address: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'address',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "addressId" },
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
