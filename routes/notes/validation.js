const Joi = require("joi");

const schemaAddNote = Joi.object({
  title: Joi.string().min(3).max(16).required(),
  text: Joi.string().min(3).required(),
});

const schemachangeNote = Joi.object({
  title: Joi.string().min(3).max(16).required(),
  text: Joi.string().min(3).required(),
  id: Joi.string().min(20).optional(),
});

const validateNote = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    return next({
      status: 400,
      message: `bad request`,
    });
  }
  next();
};

module.exports.addNote = (req, res, next) => {
  return validateNote(schemaAddNote, req.body, next);
};

module.exports.changeNote = (req, res, next) => {
  return validateNote(schemachangeNote, req.body, next);
};
