var express = require("express");
var business = require("../business/business");
var app = express();

const apiServ = {
    start: function (port) {
        app.use(express.json());

        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.get("/api/test", function (req, res) {
            res.json("test");
        });

        app.post("/api/addCustomer", function (req, res) {
            let testEmail = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
            if (testEmail.test(req.body.email))
                business.addCustomer(req.body);
            else
                res.json("Email error !");
        });

        app.get("/api/customers", function (req, res) {
            const number = req.query.number;
            const page = req.query.page;

            const resCustomers = business.getCustomers(number, page);

            res.json(resCustomers);
        });

        app.get("/api/customer", function(req, res){
            const id = req.query.id;

            const resCustomer = business.getCustomerById(id);

            res.json(resCustomer);
        });

        app.post("/api/modifCustomer", function (req, res) {
            const id = req.query.id;
            const newCustomer = req.body;

            let testEmail = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
            if (testEmail.test(req.body.email))
                modifCustomer(id, newCustomer);
            else
                res.json("Email error !");
        });

        app.delete("/api/deleteCustomer", function (req, res) {
            const id = req.query.id;
            deleteCustomer(id);
        });

        app.listen(port, function () {
            console.log("Server running on port " + port);
        });
    }
};

module.exports = apiServ;