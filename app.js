const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3030;
const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// panggil ejs dan set ke express
app.set('view engine','ejs');

// panggil semua routing yang ada
const routeCars = require('./routes/cars.route');
const routeOrders = require('./routes/orders.route');
const routeViews = require('./routes/views.routes');
app.use(routeCars);
app.use(routeOrders);
app.use(routeViews);

// panggil package yang dipakai/perlukan
// const optionAllow = {
//     origin: 'http://localhost:3000'
// }
// app.use(cors(optionAllow));

app.use(cors());

// buat server virtual
app.listen(port, () => {
    console.log("Backend Praktik API Berjalan di port : ",port)
});