const sequelize = require("../config/database");
const CarsTable = require("./cars.model");
const OrdersTable = require("./orders.model");

const models = {
  CarsTable,
  OrdersTable
};

// 👉 Panggil associate untuk setiap model (jika ada)
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB Connection successfully");
        await sequelize.sync();
        console.log("Model synced");
    } catch (error) {
        console.log("DB Connection failed : ",error);
    }
}

module.exports = { initDB, CarsTable, OrdersTable }