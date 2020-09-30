const models = require("../models");
const jwtUtils = require('../utils/jwt.utils');

module.exports = {
  createPost: async(req, res) => {
    const newPost = {
    content:req.body.content,
    like:req.body.like,
    picture:req.body.picture,
    };
    if (newPost.content === null) {
    return res.status(400).json({
      error:"missing post"});
    }
    const addPost = await models.Post.create({
      content:newPost.content,
      like:newPost.like,
      picture:newPost.picture,
      })
      if(addPost){
        return res.status(201).json(
          addPost
        )
      }
  },
  getOnePost: async (req, res) => {
    const postId = req.params.id;
    if (postId) {
      const post = await models.Post.findOne({ where: { id: postId } });
      if (post) {
        return res.status(200).json({ post: post });
      } else
        return res
          .status(404)
          .json({ error: "404: le post n'exsiste pas" });
    } else {
      return res
        .status(404)
        .json({ error: "404 page indisponible" });
    }
  },
  getAllPost: async (req, res) => {
    const postAll = await models.Post.findAll({ limit: 10 });
    if (postAll) {
      res.status(200).json({ post: postAll });
    } else {
      res
        .status(500)
        .json({ err: "500 il n'y a pas de post" });
    }
  },
  editPost: async (req, res) => {
    const postId = req.params.id;
    const updatePost = await models.Post.update(req.body, {
      where: { id: postId },
    });
    if (updatePost) {
      const updatedPost = await models.Post.findOne({
        where: { id: postId },
      });
      return res
        .status(200)
        .json({ proflil: `'post de ${updatedPost.postName} modifié'` });
    } else {
      return res
        .status(500)
        .json({ error: "500 ressource non trouvé" });
    }
  },
  deletePost: async (req, res) => {
    const postId = req.params.id;
    const deleted = await models.Post.destroy({
      where: { id: postId },
    });
    if (deleted) {
      return res.status(200).json({ succes: `Post supprimé` });
    } else {
      return res.status(404).json({ err: "post deja supprimé" });
    }
  }, 
}









