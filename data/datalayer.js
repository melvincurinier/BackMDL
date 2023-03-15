const fs = require("fs");

const filename = "./data/customers.json";

let dataLayer = {
    getAllCustomers: function () {
        // read json file
        const data = fs.readFileSync(filename);

        // parse to object
        const customers = JSON.parse(data);

        // return customers
        return customers;
    },

    getNextId: function () {
        return;
    },

    addCustomer: function (customer) {
        return;
    },

    getCustomers: function (number, page) {
        const data = fs.readFileSync(filename);

        let customers = JSON.parse(data);

        const total = customers.length;

        if(number && page){
            customers = customers.slice((page - 1) * number, page * number);
        }

        const result = {
            total : total,
            result : customers
        };

        return result;
    }
}

module.exports = dataLayer;