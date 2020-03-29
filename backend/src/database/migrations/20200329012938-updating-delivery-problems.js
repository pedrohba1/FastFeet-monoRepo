module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('delivery_problems', 'description', {
            type: Sequelize.TEXT,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('delivery_problems');
    },
};
