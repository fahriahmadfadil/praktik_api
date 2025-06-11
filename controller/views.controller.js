const { OrdersTable, CarsTable } = require("../model");

const viewHomePage = async(req,res) => {
    res.render('pages/index');
} 

const viewCarsPage = async(req,res) => {
    const carsData = await CarsTable.findAll({ order: [['id', 'ASC']] });
    res.render('pages/cars', { data : carsData });
}

const viewOrdersPage = async(req,res) => {
    const orders = await OrdersTable.findAll({
        include: [{
            model: CarsTable,
            as: 'cars'
        }]
    });

    res.render('pages/orders', { data: orders });
}

module.exports = {viewHomePage, viewCarsPage, viewOrdersPage}