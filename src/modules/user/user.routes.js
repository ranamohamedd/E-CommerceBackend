

import express from 'express'
import { validation } from '../../middleware/validation.js';
import { addUser, changePassword, deleteUser, getAllUsers, getUserById, updateUser } from './controller/user.controller.js';
import { addUserSchema, updateUserSchema ,getByIdSchema} from './user.validation.js';

const userRoutes = express.Router();

userRoutes.route("/")
.post(validation(addUserSchema ), addUser)
.get(getAllUsers)

userRoutes.route("/:id")
.get(validation(getByIdSchema), getUserById)
.patch(validation(updateUserSchema),updateUser)
.delete(validation(getByIdSchema),deleteUser)


userRoutes.patch("/changePassword/:id", changePassword)





export default userRoutes;