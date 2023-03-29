const { deleteCustomer } = require("../data/datalayer");
const dal = require("../data/datalayer");

const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 100;

const business = {
    getAllCustomers: function () {
        return dal.getAllCustomers();
    },

    addCustomer: function (data) {
        dal.addCustomer(data);
    },

    getCustomers: function (number, page) {
        if (number === undefined || page === undefined) {
            number = defaultNumber;
            page = defaultPage;
        }
        if (number > maxNumber) {
            number = maxNumber;
        }

        const resCustomers = dal.getCustomers(number, page);

        resCustomers.page = page;
        resCustomers.numberByPage = number;
        resCustomers.totalPages = Math.ceil(resCustomers.total / number);

        return resCustomers;
    },

    getCustomerById: function(id){
        const resCustomer = dal.getCustomerById(id);

        return resCustomer;
    },

    modifCustomer: function (id, newCustomer) {
        dal.modifCustomer(id, newCustomer);
    },

    deleteCustomer: function (id) {
        dal.deleteCustomer(id);
    }
}

module.exports = business;