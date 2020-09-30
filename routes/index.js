const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const { response } = require("express");

router.use(bodyParser.json());

// USER ROUTES
router.post("/login", userController.login);
router.post("/register", userController.register);

// POST ROUTES
router.post("/posts",postController.createPost);
router.get("/posts",postController.getAllPost);
router.get("/posts/:id",postController.getOnePost);
router.patch("/posts/:id", postController.editPost);
router.delete("/posts/:id", postController.deletePost);


router.use('*', (req, res) => {
    response.status(404).json({
      error: 'Oups, error !',
    });
  });

module.exports = router;
