'use strict';
const faker = require("faker");

const generateUsers = (usersCount) => {
  let users = [];

  for (let i= 0; i< usersCount; i++) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      country: faker.address.country(),
      picture: faker.image.avatar(),
      password: faker.internet.password(),
      birthday: faker.date.past(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
users.push(user);
  }
  return users;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert(
     "Users",
     generateUsers(50),
     {}
   );
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Users', null, {});
    
  }
};
