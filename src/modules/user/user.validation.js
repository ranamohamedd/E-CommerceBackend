
import joi from 'joi'

export const addUserSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().min(3).max(30).required(),
    password: joi.string().min(5).max(30).required(),

    
})

export const getByIdSchema = joi.object({
    id: joi.string().hex().length(24).required()
})

export const updateUserSchema = joi.object({
    id: joi.string().hex().length(24).required(),
    name: joi.string().min(3).max(20),
    password: joi.string().min(3).max(20)

})