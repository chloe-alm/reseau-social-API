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
// router.get("/posts:id",postController.getPosts);
//router.get("/posts:id",postController.getPostsById);

router.use('*', (req, res) => {
    response.status(404).json({
      error: 'Oups, error !',
    });
  });

module.exports = router;
