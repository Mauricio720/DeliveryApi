'use strict';
var bcrypt = require("bcrypt");

async function hash(password) {
    const salt = await bcrypt.genSalt(10);
    const passwprdHash = await bcrypt.hash(password, salt);  

    return passwprdHash;
}


module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [
            {
                name: 'Admin',
                type: 1,
                email:'Admin@gmail.com',
                password:  await hash('1234'),
                profileImg:'default.jpg',
                permissions:'[1]'
            },

            {
                name: 'Client',
                type: 2,
                email:'Client@gmail.com',
                password:  await hash('1234'),
                profileImg:'default.jpg',
            },

            {
                name: 'Super User',
                type: 3,
                email:'SuperUser@gmail.com',
                password: await hash('1234'),
                profileImg:'default.jpg',
            },
    ], {});

    await queryInterface.bulkInsert('address', [
        {
            street: 'Rua Teste',
            number: '1111',
            neighborhood:'Bairro Teste',
            city:'Cidade Teste',
            state:'SP',
            cep:'69088-514',
            id_user:2

        },

        {
            street: 'Rua Teste',
            number: '1111',
            neighborhood:'Bairro Teste',
            city:'Cidade Teste',
            state:'SP',
            cep:'69311-091',
            id_user:3
        },
    ], {});

    await queryInterface.bulkInsert('products', [
        {
            name: 'Pizza Teste',
            description:'Pizza Teste',
            full_price:25.00,
            half_price:12.50,
            img:'default.jpg',
            id_user:1
        },

        {
            name: 'Pizza Teste 2',
            description:'Pizza Teste 2',
            full_price:25.00,
            half_price:12.50,
            img:'default.jpg',
            id_user:1
        },

        {
            name: 'Pizza Teste 3',
            description:'Pizza Teste 3',
            full_price:25.00,
            half_price:12.50,
            img:'default.jpg',
            id_user:1
        },

        {
            name: 'Pizza Teste 4',
            description:'Pizza Teste 4',
            full_price:25.00,
            half_price:12.50,
            img:'default.jpg',
            id_user:1
        },

    ], {});


    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
        await queryInterface.bulkDelete('address', null, {});
        await queryInterface.bulkDelete('products', null, {});
    }
};
