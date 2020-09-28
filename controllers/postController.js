const models = require("../models");

module.exports = {
createPost: async(req, res) => {
const newPost ={
content:req.body.content,
like:req.body.like,
picture:req.body.picture,

};
console.log("content: ",req.body.content)
if (newPost.content === null) {
return res.status(400).json({
  error:"missing post"});
}
// const addContent = await models.Post.findOne({
// attributes: ["content"],
// where: { 
//   content:newPost.content,
//  },
// })
// if(!addContent){
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
// }else{
// return res.status(500).json({
// error:"serveur error"
// })
// }
}
}







