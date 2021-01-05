'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert("Users",[
       {
        firstName:"lilou",
        lastName:"lilou",
        email:"lilou@gmail.com",
        password:"123Azerty",
        // birthday:01-12-1990,
        country:"france",
        isAdmin:false,
        picture:"",
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        firstName:"bella",
        lastName:"bella",
        email:"bella@gmail.com",
        password:"123Azerty",
        // birthday:01-12-1990,
        country:"france",
        isAdmin:true,
        picture:"",
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        firstName:"eve",
        lastName:"eve",
        email:"eve@gmail.com",
        password:"123Azerty",
        // birthday:01-12-1990,
        country:"france",
        isAdmin:true,
        picture:"",
        createdAt: new Date(),
        updatedAt: new Date(),
       },
       {
        firstName:"demon",
        lastName:"demon",
        email:"demon@gmail.com",
        password:"123Azerty",
        // birthday:01-12-1990,
        country:"france",
        isAdmin:false,
        picture:"",
        createdAt: new Date(),
        updatedAt: new Date(),
       },
     ],
     {}
   );
    //  generateUsers(10),
     
    },
  

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Users', null, {});
    
  },
};
