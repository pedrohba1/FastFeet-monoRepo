module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
        */

        return queryInterface.createTable('recipient', {
            // TODO: aqui eu tenho que adicionar os campos
            // rua, numero, complemento, estado, cidade e CEP

            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('recipient');
    },
};
