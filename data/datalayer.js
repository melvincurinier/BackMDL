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
        const data = fs.readFileSync(filename);

        let customers = JSON.parse(data);

        if(customers.length == 0){
            customer.id = 1;
        } else {
            customer.id = customers[customers.length - 1].id + 1;
        }
        var date = new Date();
        customer.created_at = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        customers.push(customer);
        fs.writeFileSync("./data/customers.json", JSON.stringify(customers));
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