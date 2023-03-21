const fs = require("fs");
const { get } = require("https");
const { modifCustomer } = require("../business/business");

const filename = "./data/customers.json";

function getAllCustomers() {
    // read json file
    const data = fs.readFileSync(filename);

    // parse to object
    const customers = JSON.parse(data);

    // return customers
    return customers;
}

function getNextId(customers, idCustomer) {
    let rank;
    let compt = 0;
    for (let customer of customers) {
        if (customer.id == idCustomer) rank = compt;
        compt++;
    }
    return rank;
}

let dataLayer = {
    addCustomer: function (customer) {
        let customers = getAllCustomers();

        if (customers.length == 0) {
            customer.id = 1;
        } else {
            customer.id = customers[customers.length - 1].id + 1;
        }
        var date = new Date();
        customer.created_at = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        customers.push(customer);

        fs.writeFileSync(filename, JSON.stringify(customers));
    },

    getCustomers: function (number, page) {
        let customers = getAllCustomers();

        const total = customers.length;

        if (number && page) {
            customers = customers.slice((page - 1) * number, page * number);
        }

        const result = {
            total: total,
            result: customers
        };

        return result;
    },

    getCustomerById: function (id) {
        let customer = {};
        let customers = getAllCustomers();
        let rank = getNextId(customers, id);

        customer.email = customers[rank].email;
        customer.first = customers[rank].first;
        customer.last = customers[rank].last;
        customer.company = customers[rank].company;
        customer.country = customers[rank].country;
        
        return customer;
    },

    modifCustomer: function (id, newCustomer) {
        let customers = getAllCustomers();
        let rank = getNextId(customers, id);

        customers[rank].email = newCustomer.email;
        customers[rank].first = newCustomer.first;
        customers[rank].last = newCustomer.last;
        customers[rank].company = newCustomer.company;
        customers[rank].country = newCustomer.country;

        fs.writeFileSync(filename, JSON.stringify(customers));
    }
}

module.exports = dataLayer;