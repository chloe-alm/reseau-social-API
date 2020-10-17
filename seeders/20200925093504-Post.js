"use strict";
// const { random } = require('faker');
// const faker = require('faker');

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const generatePosts = (postNumber)=>{
//   const result =[]

//   for (let i= 0; i< postNumber; i++) {
//     const post = {
//       content:faker.lorem.paragraph(2),
//       like:faker.random.number(50),
//       picture:faker.image.nature(),
//       userId:getRandomInt(1,10),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       }
//       result.push(post)
//   }
//   return result
// }
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Posts", [
      {
        content:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles ",
        like: 14,
        picture: "https://lh3.googleusercontent.com/proxy/IhJzaPXBxRWkBkm2wMpD_TgKTshA6DTe6k6Vc96etPicctnSwh69IXPJdx6FSqktS5gxhVIdn9VzWINWEDifrncW8IVIXcbfZ7Q5cZDYoKawiUHfSBCLUvlo",
        userId:21,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles ",
        like: 20,
        picture: "https://lh3.googleusercontent.com/proxy/IhJzaPXBxRWkBkm2wMpD_TgKTshA6DTe6k6Vc96etPicctnSwh69IXPJdx6FSqktS5gxhVIdn9VzWINWEDifrncW8IVIXcbfZ7Q5cZDYoKawiUHfSBCLUvlo",
        userId:22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles ",
        like: 30,
        picture: "https://lh3.googleusercontent.com/proxy/IhJzaPXBxRWkBkm2wMpD_TgKTshA6DTe6k6Vc96etPicctnSwh69IXPJdx6FSqktS5gxhVIdn9VzWINWEDifrncW8IVIXcbfZ7Q5cZDYoKawiUHfSBCLUvlo",
        userId:23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles ",
        like: 11,
        picture: "https://lh3.googleusercontent.com/proxy/IhJzaPXBxRWkBkm2wMpD_TgKTshA6DTe6k6Vc96etPicctnSwh69IXPJdx6FSqktS5gxhVIdn9VzWINWEDifrncW8IVIXcbfZ7Q5cZDYoKawiUHfSBCLUvlo",
        userId:24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles ",
        like: 40,
        picture: "https://lh3.googleusercontent.com/proxy/IhJzaPXBxRWkBkm2wMpD_TgKTshA6DTe6k6Vc96etPicctnSwh69IXPJdx6FSqktS5gxhVIdn9VzWINWEDifrncW8IVIXcbfZ7Q5cZDYoKawiUHfSBCLUvlo",
        userId:25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles ",
        like: 18,
        picture: "https://lh3.googleusercontent.com/proxy/IhJzaPXBxRWkBkm2wMpD_TgKTshA6DTe6k6Vc96etPicctnSwh69IXPJdx6FSqktS5gxhVIdn9VzWINWEDifrncW8IVIXcbfZ7Q5cZDYoKawiUHfSBCLUvlo",
        userId:26,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
    );
    
    // ,generatePosts(2),{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
