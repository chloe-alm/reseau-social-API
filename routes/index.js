const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jwt = require("../utils/jwt.utils")
const isAdmin = require("../middleware/adminRole_handler")
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const mailController = require("../controllers/mailController");
const eventController = require("../controllers/eventController");

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
router.get("/user-posts", jwt.authenticateJWT, postController.getUserPost);

router.post("/posts", jwt.authenticateJWT, postController.createPost);

router.patch("/posts/:id", jwt.authenticateJWT, postController.editPost);
router.delete("/posts/:id", jwt.authenticateJWT, postController.deletePost);

//Event ROUTES
router.get("/events", jwt.authenticateJWT, eventController.getAllEvent);
router.get("/events/:id", jwt.authenticateJWT, eventController.getOneEvent);

router.post("/events", jwt.authenticateJWT,isAdmin, eventController.createEvent);

router.patch("/events/:id", jwt.authenticateJWT, eventController.editEvent);
router.delete("/events/:id", jwt.authenticateJWT, eventController.deleteEvent);

module.exports = router;
