'use strict';
const { random } = require('faker');
const faker = require('faker');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generatePost = (postNumber)=>{
  const result =[] 

  for (let i= 0; i< postNumber; i++) {
    const post = {
      content:faker.lorem.paragraph(2),
      like:faker.random.number(50),
      picture:faker.image.nature(),
      userId:getRandomInt(1,10),
      createdAt: new Date(),
      updatedAt: new Date(),
      }
      result.push(post)
  }
  return result
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert("Posts",generatePost(2),{})
    },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  
  }
};
