import Joi from "joi";

// Define schema for user registration
export const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Define schema for user login
export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
