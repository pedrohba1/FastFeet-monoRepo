const { genCouriers } = require('../../utils/genCouriers');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const couriers = genCouriers(100);

        return queryInterface.bulkInsert('couriers', couriers, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('couriers');
    },
};
