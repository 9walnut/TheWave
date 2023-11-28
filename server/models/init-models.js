var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _carts = require("./carts");
var _categories = require("./categories");
var _orderdetails = require("./orderdetails");
var _orders = require("./orders");
var _products = require("./products");
var _users = require("./users");

function initModels(sequelize) {
  var address = _address(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var orderdetails = _orderdetails(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  orders.belongsTo(address, { as: "address", foreignKey: "addressID"});
  address.hasMany(orders, { as: "orders", foreignKey: "addressID"});
  products.belongsTo(categories, { as: "category", foreignKey: "categoryID"});
  categories.hasMany(products, { as: "products", foreignKey: "categoryID"});
  orderdetails.belongsTo(orders, { as: "order", foreignKey: "orderID"});
  orders.hasMany(orderdetails, { as: "orderdetails", foreignKey: "orderID"});
  carts.belongsTo(products, { as: "product", foreignKey: "productID"});
  products.hasMany(carts, { as: "carts", foreignKey: "productID"});
  orderdetails.belongsTo(products, { as: "product", foreignKey: "productID"});
  products.hasMany(orderdetails, { as: "orderdetails", foreignKey: "productID"});
  address.belongsTo(users, { as: "userNumber_user", foreignKey: "userNumber"});
  users.hasMany(address, { as: "addresses", foreignKey: "userNumber"});
  carts.belongsTo(users, { as: "userNumber_user", foreignKey: "userNumber"});
  users.hasMany(carts, { as: "carts", foreignKey: "userNumber"});
  orders.belongsTo(users, { as: "userNumber_user", foreignKey: "userNumber"});
  users.hasMany(orders, { as: "orders", foreignKey: "userNumber"});

  return {
    address,
    carts,
    categories,
    orderdetails,
    orders,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
