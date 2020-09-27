const models = require("../models");

module.exports = {
createPost: (req, res) => {
const newPost ={
content:req.body.content,
userId:req.body.userId
};
if (newPost.content === null || newPost.userId=== null) {
return res.status(400).json({
  error:"missing post"});
}
const addContent = models.Post.findOne({
attributes: ["content"],
where: { 
  content:newPost.content,
 },
})
if(addContent){
return res.status(201).json({
content:addContent.content,
});
}else{
return res.status(500).json({
error:"serveur error"
})
}
}
}






