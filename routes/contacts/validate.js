const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
  description: Joi.string().optional(),
  token: Joi.string().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(16).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  description: Joi.string().optional(),
  token: Joi.string().optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.AddContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next);
};

module.exports.UpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
