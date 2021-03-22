const Joi = require("joi");
const { HttpCode } = require("../../helpers/Constants");

const schemaValidateNewUser = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional(),
});

const schemaValidateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateLogin = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    return next({
      status: 400,
      message: `Email or password is wrong`,
    });
  }
  next();
};

const validateRegistration = (schema, obj, next) => {
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

module.exports.UploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Field Avatar with file not found",
    });
  }
  next();
};

module.exports.validateLogin = (req, res, next) => {
  return validateLogin(schemaValidateLogin, req.body, next);
};
module.exports.validateRegistration = (req, res, next) => {
  return validateRegistration(schemaValidateNewUser, req.body, next);
};
