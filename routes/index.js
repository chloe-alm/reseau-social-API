const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const authenticate_Handler = require("../middleware/authenticate_Handler");

const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

router.use(bodyParser.json());

// USER ROUTES
router.get("/register", authenticate_Handler, userController.getAllUser);
router.get("/register/:id", authenticate_Handler, userController.getOneUser);

router.post("/login", userController.login);
router.post("/register", userController.register);

router.patch("/register/:id", authenticate_Handler, userController.editUser);
router.delete("/register/:id", authenticate_Handler, userController.deleteUser);

// POST ROUTES
router.get("/posts", authenticate_Handler, postController.getAllPost);
router.get("/posts/:id", authenticate_Handler, postController.getOnePost);

router.post("/posts", authenticate_Handler, postController.createPost);

router.patch("/posts/:id", authenticate_Handler, postController.editPost);
router.delete("/posts/:id", authenticate_Handler, postController.deletePost);

module.exports = router;
