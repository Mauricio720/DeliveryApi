'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: Sequelize.STRING(250),
                allowNull:false,
            },

            email: {
                type: Sequelize.STRING(450),
                allowNull:false,
            },

            type:{
                type:Sequelize.INTEGER,
                allowNull: false,
            },

            password:{
                type: Sequelize.STRING(250),
                allowNull:false,
            },

            profileImg:{
                type: Sequelize.STRING(250),
                allowNull:true,
                defaultValue:'default.jpg'
            },

            permissions:{
                type: Sequelize.STRING(250),
                allowNull:true,
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });

        await queryInterface.createTable('address', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            street: {
                type: Sequelize.STRING(250),
                allowNull:false,
            },

            number:{
                type: Sequelize.STRING(50),
                allowNull:false,
            },

            neighborhood:{
                type: Sequelize.STRING(250),
                allowNull:false,
            },

            city:{
                type: Sequelize.STRING(250),
                allowNull:false,
            },

            state:{
                type: Sequelize.STRING(250),
                allowNull:false,
            },

            cep:{
                type: Sequelize.STRING(14),
                allowNull:false,
            },

            complement:{
                type: Sequelize.STRING(250),
                allowNull:true,
            },

            id_user:{
                type:Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id"
                }
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });

        await queryInterface.createTable('products', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: Sequelize.STRING(250),
                allowNull:false,
            },

            description:{
                type: Sequelize.TEXT,
                allowNull:false,
            },

            full_price:{
                type:Sequelize.DECIMAL(10,2),
                allowNull:false,
            },

            half_price:{
                type:Sequelize.DECIMAL(10,2),
                allowNull:false,
            },
            
            img:{
                type:Sequelize.STRING(250),
                allowNull:true,
                defaultValue:'default.jpg'
            },

            id_user:{
                type:Sequelize.INTEGER,
                allowNull:true,
                references: {
                    model: "users",
                    key: "id"
                }
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });

        
        await queryInterface.createTable('sales', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            sub_total:{
                type:Sequelize.DECIMAL(10,2),
                allowNull: false,
            },

            total:{
                type:Sequelize.DECIMAL(10,2),
                allowNull: false,
            },
            
            id_user:{
                type:Sequelize.INTEGER,
                allowNull:false,
                references: {
                    model: "users",
                    key: "id"
                }
            },

            observation:{
                type:Sequelize.TEXT,
                allowNull:true,
            },

            id_address:{
                type:Sequelize.INTEGER,
                references: {
                    model: "address",
                    key: "id"
                }
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });

        await queryInterface.createTable('items_sales', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            id_product:{
                type:Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "products",
                    key: "id"
                }
            },

            unit_price:{
                type:Sequelize.DECIMAL(10,2),
                allowNull: false,
            },

            total_price:{
                type:Sequelize.DECIMAL(10,2),
                allowNull: false,
            },
            
            id_sale:{
                type:Sequelize.INTEGER,
                allowNull:false,
                references: {
                    model: "sales",
                    key: "id"
                }
            },

            observation:{
                type:Sequelize.TEXT,
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
        await queryInterface.dropTable('address');
        await queryInterface.dropTable('products');
        await queryInterface.dropTable('sales');
        await queryInterface.dropTable('items_sales');
        
    }
};
