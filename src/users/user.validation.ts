import { schema } from 'express-validation';

import Joi from 'joi';

export const signUpuserSchema:schema = {body :Joi.object({
    email: Joi.string().email().required(),
    dateOfBirth:Joi.date().required(),
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    password: Joi.string().required().min(6), 
    
})};

export const logInuserSchema:schema = {body :Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})};

export const updateProfileSchema:schema = {body :Joi.object({
    dateOfBirth:Joi.date(),
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
})};

