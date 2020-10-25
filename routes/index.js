const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jwt = require("../utils/jwt.utils")
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const mailController = require("../controllers/mailController");

router.use(bodyParser.json());


// USER ROUTES
router.get("/user/me",jwt.authenticateJWT, userController.getUserMe);
router.get("/register",jwt.authenticateJWT, userController.getAllUser);
router.get("/register/:id", jwt.authenticateJWT, userController.getOneUser);

router.post("/login", userController.login);
router.post("/register", userController.register);

router.patch("/register/:id", jwt.authenticateJWT, userController.editUser);
router.delete("/register/:id", jwt.authenticateJWT, userController.deleteUser);

router.post("/contact", mailController.sendContactMail);
// POST ROUTES
router.get("/posts", jwt.authenticateJWT, postController.getAllPost);
router.get("/posts/:id", jwt.authenticateJWT, postController.getOnePost);

router.post("/posts", jwt.authenticateJWT, postController.createPost);

router.patch("/posts/:id", jwt.authenticateJWT, postController.editPost);
router.delete("/posts/:id", jwt.authenticateJWT, postController.deletePost);



module.exports = router;
