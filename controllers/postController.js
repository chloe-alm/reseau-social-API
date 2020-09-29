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
  }
  // getPosts:async(req,res)=>{
  //   const postId = req.params.id;
  //   console.log(postId);
  //   if(postId){
  //     const post = await models.Posts.findAll(
  //       {
  //         were:{id:postId}
  //       }
  //     );
  //       return res.status(200).json({post:postId});
  //   }else{
  //     return res.status(404).json({error:"page indisponible"})
  //   }
  // },  
}









