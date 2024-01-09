import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createUser,
  deleteUser,
  getUserById,
  getUserByLatLong,
  getUsers,
} from "../services/userService";

//@desc Get all Users
//@route GET /api/users
//@access Public
export const getAllusersHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await getUsers();
    res.status(200).json(users);
  }
);

//@desc Create a new User
//@route POST /api/users
//@access Private
export const createUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await createUser(req.body);
    if(user.status === 400){
      res.status(400).json(user);
    }
    res.status(201).json(user);
  }
);
//@desc Radius by lat-long of User
//@route POST /api/users/:id
//@access Private
export const getRadiusUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { lat, long } = req.body;
    const { id } = req.params;
    const userByLatLong = await getUserByLatLong( id, lat, long )

    res.status(200).json(userByLatLong);
    
  }
);

//@desc Login a User
//@route POST /api/users/login
//@access Private

// export const loginUserHandler = asyncHandler(async (req: Request, res: Response) => {
//   const user = await loginUser(req.body.email, req.body.password);
//   res.status(200).json(user)
// })

//@desc Get a User by id
//@route GET /api/users/:id
//@access Public
export const getUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  }
);

//@desc Delete a User by id
//@route DELETE /api/user/:id
//@access Private
export const deleteUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await deleteUser(req.params.id);
    res.status(200).json({
      message: `user ${req.params.id} deleted`,
      user: user,
    });
  }
);
