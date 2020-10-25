const models = require("../models");
const {
  
  BadRequestError,
  ConflictError,
  UnAuthorizedError,
  ServerError,
  NotFoundError,
} = require("../helpers/errors");

module.exports = {
  createPost: async (req, res) => {
    const post = {
      content: req.body.content,
      like: req.body.like,
      picture: req.body.picture,
    };
    if (post.content === null) {
      throw new BadRequestError(
        "Bad request", 
        "Input content must  be filled"
      );
    }
    const addPost = await models.Post.create({
      content: post.content,
      userId: req.user.userId,
      like: post.like,
      picture: post.picture,
    });
    res.status(201).json({addPost});
  },
  getOnePost: async (req, res) => {
    const postId = req.params.id;
    if (postId) {
      const post = await models.Post.findOne({ where: { id: postId } });
      if (post) {
        return res.status(200).json({ post: post });
      } else
      throw new NotFoundError(
        "Resource not found", 
        "404: Post not found");
    } else {
      throw new NotFoundError(
        "Resource not found", 
        "404 page indisponible");
      
    }
  },
  getAllPost: async (req, res) => {
    const postAll = await models.Post.findAll({ limit: 10, order:[["id", "DESC"]] });
    if (postAll) {
      res.status(200).json({ post: postAll });
    } else {
      throw new ServerError(
        "servor error",
        "500 : there is not post");
    }
  },
  editPost: async (req, res) => {
    const getPostId = req.params.id;
    const initialPost = await models.Post.findOne({
      attributes: ["content", "like", "picture"],
      where: { id: getPostId },
    });

    if (!initialPost) {
      throw new NotFoundError(
        "Resource not found",
        "There is nothing to find at that url, the ID does not exist"
      );
    }

    let inputStatePost = {
      content: req.body.content,
      like: req.body.like,
      picture: req.body.picture,
    };

    if (
      initialPost.content === inputStatePost.content &&
      initialPost.like === inputStatePost.like &&
      initialPost.picture === inputStatePost.picture
    ) {
      throw new BadRequestError(
        "Bad Request",
        "No need to update, you didn't modified anything"
      );
    }

    const updatePost = await models.Post.update(req.body, {
      where: { id: getPostId },
    });
    const changedPost = await models.Post.findOne({
      attributes: ["content", "like", "picture"],
      where: { id: getPostId },
    });
    return res.status(201).json({ updatePost, changedPost });
  },
  deletePost: async (req, res) => {
    const postId = req.params.id;
    const deleted = await models.Post.destroy({
      where: { id: postId },
    });
    if (deleted) {
      return res.status(201).json({ succes: `Post post delete` });
    } else {
      throw new NotFoundError(
        "Resource not found",
        "The requested resource does not (or no longer) exist"
      );
    }
  },
};
