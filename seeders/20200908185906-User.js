'use strict';

const faker  = require("faker");

const generateUsers = (usersCount) => {
  let users = [];

  for (let i=0; i< usersCount; i++){
    const user = {
      firstName: faker.name.firstName(), 
      lastName: faker.name.lastName(), 
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthdate: faker.date.past(),
      attachment: faker.image.avatar(),
      country: faker.address.country(),
      createdAt: new Date(),
      updateAt: new Date(),

    };
    users.push(user);
  }
  return users;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(
     "Users",//database table's name
     generateUsers(50),
     {}
  );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User', null, {})
  }
};
