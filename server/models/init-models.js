var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _carts = require("./carts");
var _categories = require("./categories");
var _orders = require("./orders");
var _payment = require("./payment");
var _productoption = require("./productoption");
var _productout = require("./productout");
var _products = require("./products");
var _users = require("./users");
var _wishlist = require("./wishlist");

function initModels(sequelize) {
  var address = _address(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var productoption = _productoption(sequelize, DataTypes);
  var productout = _productout(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var wishlist = _wishlist(sequelize, DataTypes);

  orders.belongsTo(carts, { as: "cart", foreignKey: "cartId"});
  carts.hasMany(orders, { as: "orders", foreignKey: "cartId"});
  productout.belongsTo(carts, { as: "cart", foreignKey: "cartId"});
  carts.hasMany(productout, { as: "productouts", foreignKey: "cartId"});
  products.belongsTo(categories, { as: "category", foreignKey: "categoryId"});
  categories.hasMany(products, { as: "products", foreignKey: "categoryId"});
  payment.belongsTo(orders, { as: "order", foreignKey: "orderId"});
  orders.hasMany(payment, { as: "payments", foreignKey: "orderId"});
  productout.belongsTo(orders, { as: "order", foreignKey: "orderId"});
  orders.hasMany(productout, { as: "productouts", foreignKey: "orderId"});
  carts.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(carts, { as: "carts", foreignKey: "productId"});
  orders.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(orders, { as: "orders", foreignKey: "productId"});
  productoption.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasOne(productoption, { as: "productoption", foreignKey: "productId"});
  productout.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(productout, { as: "productouts", foreignKey: "productId"});
  wishlist.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(wishlist, { as: "wishlists", foreignKey: "productId"});
  address.belongsTo(users, { as: "userNumber_user", foreignKey: "userNumber"});
  users.hasMany(address, { as: "addresses", foreignKey: "userNumber"});
  carts.belongsTo(users, { as: "userNumber_user", foreignKey: "userNumber"});
  users.hasMany(carts, { as: "carts", foreignKey: "userNumber"});
  orders.belongsTo(users, { as: "userNumber_user", foreignKey: "userNumber"});
  users.hasMany(orders, { as: "orders", foreignKey: "userNumber"});
  wishlist.belongsTo(users, { as: "userNumber_user", foreignKey: "userNumber"});
  users.hasMany(wishlist, { as: "wishlists", foreignKey: "userNumber"});

  return {
    address,
    carts,
    categories,
    orders,
    payment,
    productoption,
    productout,
    products,
    users,
    wishlist,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
