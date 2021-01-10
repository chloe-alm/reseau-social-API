const models = require("../models"); 
const {
   BadRequestError,
    ConflictError,
    UnAuthorizedError,
    ServerError,
    NotFoundError,
  } = require("../helpers/errors");

  module.exports = {
    createEvent: async (req, res) => {
      const event = {
        title:req.body.title,
        content: req.body.content,
        hashtag: req.body.hashtag,
     
      };
      if (event.content === null) {
        throw new BadRequestError(
          "Bad request", 
          "Input content must be filled"
        );
      }
      const addEvent = await models.Event.create({
          title: event.title,
          userId: req.user.userId,
         content: event.content,
         hashtag:event.hashtag,
       
      });
      res.status(201).json({addEvent});
    },
    getOneEvent: async (req, res) => {
        const eventId = req.params.id;
        if (eventId) {
          const event = await models.Event.findOne({ where: { id: eventId } });
          if (event) {
            return res.status(200).json({ event: event });
          } else
          throw new NotFoundError(
            "Resource not found", 
            "Event not found");
        } else {
          throw new NotFoundError(
            "Resource not found", 
            "Page indisponible");
          
        }
      },
    getAllEvent: async (req, res) => {
        const eventAll = await models.Event.findAll({ limit: 10, order:[["id", "DESC"]] });
        if (eventAll) {
          res.status(200).json({ event: eventAll });
        } else {
          throw new ServerError(
            "servor error",
            "There is not event");
        }
      },
      editEvent: async (req, res) => {
        const getEventId = req.params.id;
        const initialEvent = await models.Event.findOne({
          attributes: ["title","content", "hashtag"],
          where: { id: getEventId },
        });
        if (!initialEvent) {
          throw new NotFoundError(
            "Resource not found",
            "There is nothing to find at that url, the ID does not exist"
          );
        }
          let inputStateEvent = {
          title: req.body.title,
          content: req.body.content,
          hashtag:req.body.hashtag,
          
        };
    
        if (
            initialEvent.title === inputStateEvent.title&&
            initialEvent.content === inputStateEvent.content &&
            initialEvent.hashtag === inputStateEvent.hashtag
        ) {
          throw new BadRequestError(
            "Bad Request",
            "No need to update, you didn't modified anything"
          );
        }
    
        const updateEvent = await models.Event.update(req.body, {
          where: { id: getEventId },
        });
        const changedEvent = await models.Event.findOne({
          attributes: ["title","content", "hashtag"],
          where: { id: getEventId },
        });
        return res.status(201).json({ updateEvent, changedEvent });
      },
      deleteEvent: async (req, res) => {
        const eventId = req.params.id;
        const deleted = await models.Event.destroy({
          where: { id: eventId },
        });
        if (deleted) {
          return res.status(201).json({ succes: `Event is delete` });
        } else {
          throw new NotFoundError(
            "Resource not found",
            "The requested resource does not (or no longer) exist"
          );
        }
      },
    
    };
