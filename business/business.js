const dal = require("../data/datalayer");

const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 100;

const business = {
    getAllCustomers: function () {
        return dal.getAllCustomers();
    },

    addCustomer : function(data){
        let customer = {
            id : null,
            email : data.email,
            first : data.first,
            last : data.last,
            company : data.company,
            country : data.country,
            created_at : null
        }
        dal.addCustomer(customer);
    },

    getCustomers: function (number, page) {
        if (number === undefined || page === undefined) {
            number = defaultNumber;
            page = defaultPage;
        }
        if(number > maxNumber){
            number = maxNumber;
        }

        const resCustomers = dal.getCustomers(number, page);

        resCustomers.page = page;
        resCustomers.numberByPage = number;
        resCustomers.totalPages = Math.ceil(resCustomers.total / number);

        return resCustomers;
    }
}

module.exports = business;