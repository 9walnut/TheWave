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

  orderdetails.belongsTo(address, { as: "address", foreignKey: "addressId" });
  address.hasMany(orderdetails, {
    as: "orderdetails",
    foreignKey: "addressId",
  });
  orderdetails.belongsTo(carts, { as: "cart", foreignKey: "cartId" });
  carts.hasMany(orderdetails, { as: "orderdetails", foreignKey: "cartId" });
  products.belongsTo(categories, { as: "category", foreignKey: "categoryId" });
  categories.hasMany(products, { as: "products", foreignKey: "categoryId" });
  orderdetails.belongsTo(orders, { as: "order", foreignKey: "orderId" });
  orders.hasMany(orderdetails, { as: "orderdetails", foreignKey: "orderId" });
  carts.belongsTo(products, { as: "product", foreignKey: "productId" });
  products.hasMany(carts, { as: "carts", foreignKey: "productId" });
  orders.belongsTo(products, { as: "product", foreignKey: "productId" });
  products.hasMany(orders, { as: "orders", foreignKey: "productId" });
  address.belongsTo(users, { as: "userNumber_user", foreignKey: "userNumber" });
  users.hasMany(address, { as: "addresses", foreignKey: "userNumber" });
  carts.belongsTo(users, { as: "userNumber_user", foreignKey: "userNumber" });
  users.hasMany(carts, { as: "carts", foreignKey: "userNumber" });
  orders.belongsTo(users, { as: "userNumber_user", foreignKey: "userNumber" });
  users.hasMany(orders, { as: "orders", foreignKey: "userNumber" });

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
