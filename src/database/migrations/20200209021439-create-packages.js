module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('packages', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            recipient_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'recipients',
                    key: 'id',
                },
            },
            courier_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'couriers',
                    key: 'id',
                },
            },
            signature_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'files',
                    key: 'id',
                },
            },
            product: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            canceled_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('packages');
    },
};
