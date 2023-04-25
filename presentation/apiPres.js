var express = require("express");
var business = require("../business/business");
var app = express();

const testEmail = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;

const apiServ = {
    start: function (port) {
        app.use(express.json());

        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.get("/api/test", function (req, res) {
            res.status(200).json({ message: "Server running" });
        });

        app.post("/api/addCustomer", function (req, res) {
            try {
                const newCustomer = req.body;

                if (
                    !newCustomer.first ||
                    !newCustomer.last ||
                    !newCustomer.email ||
                    !newCustomer.company ||
                    !newCustomer.country ||
                    !testEmail.test(newCustomer.email)
                ) {
                    throw new Error("Invalid customer information");
                }
                if (business.isEmailUsed(newCustomer.email)) {
                    throw new Error("Email already used");
                }

                business.addCustomer(newCustomer);

                res.status(200).json({ message: "Customer added successfully" });
            } catch (error) {
                console.error(error);
                res.status(400).json({ message: error.message });
            }
        });

        app.get("/api/customers", function (req, res) {
            const number = req.query.number;
            const page = req.query.page;

            const resCustomers = business.getCustomers(number, page);

            res.json(resCustomers);
        });

        app.get("/api/customer", function (req, res) {
            const id = req.query.id;

            const resCustomer = business.getCustomerById(id);

            res.json(resCustomer);
        });

        app.post("/api/modifCustomer", function (req, res) {
            try {
                const customerId = req.query.id;
                const updatedCustomer = req.body;

                if (
                    !updatedCustomer.first ||
                    !updatedCustomer.last ||
                    !updatedCustomer.email ||
                    !updatedCustomer.company ||
                    !updatedCustomer.country ||
                    !testEmail.test(updatedCustomer.email)
                ) {
                    throw new Error("Invalid customer information");
                }
                if (business.isEmailUsed(updatedCustomer.email)) {
                    throw new Error("Email already used");
                }

                business.modifCustomer(customerId, updatedCustomer);

                res.status(200).json({ message: "Customer updated successfully" });
            } catch (error) {
                console.error(error);
                res.status(400).json({ message: error.message });
            }
        });

        app.delete("/api/deleteCustomer", function (req, res) {
            try {
                const id = req.query.id;
                business.deleteCustomer(id);

                res.status(200).json({ message: "Customer deleted successfully" });
            } catch (error) {
                console.error(error);
                res.status(400).json({ message: error.message });
            }
        });

        app.listen(port, function () {
            console.log("Server running on port " + port);
        });
    }
};

module.exports = apiServ;