import bcrypt from "bcryptjs";
import UserModel from "../models/userModel";
import { UserErrorReturnType, UserReturnType, UserType } from "../types/userTypes";
import { IUserSchema } from "../schema/userSchema";
import { checkIsValidObjectId } from "../database/db";
import { sanitizeLoginUser, sanitizeUpdateUser, sanitizeUser } from "../sanitizers/userSanitizer";
import HttpException from '../utils/httpException';
const admin = require('firebase-admin');
var serviceAccount = require("../utils/accountKey.json");
// admin.initializeApp();
async function initializeFirebase() {
  console.log("admin :- ", admin)
  console.log("admin-apps :- ", admin.apps)
  if (admin.apps.length === 0) {
    // await admin.initializeApp();
    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}
initializeFirebase();
// initializeFirebase();
// console.log(serviceAccount);

// import { generateToken } from './tokenService';

export async function getUsers(): Promise<UserType[]> {
  try {
    const users = await UserModel.find();
    if (!users) throw new HttpException("No users found!", 404);
    return users;
  } catch (err) {
    throw new HttpException("users not found!", 400);
  }
}

export async function createUser(user: UserType): Promise<UserReturnType | UserErrorReturnType> {
  const sanitizedUser = await sanitizeUser(user);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(sanitizedUser.password, salt);
  try {

    const emailCheck = await UserModel.find(({
      $or: [
        {email: sanitizedUser.email},
        {username: sanitizedUser.username}
      ]
    }));
    console.log(emailCheck,"emailCheck");

    if (emailCheck.length > 0) {
      if(emailCheck[0].email === sanitizedUser.email) {
        return {
          message:"Email is already in use",
          status: 400
        };
      }else if(emailCheck[0].username === sanitizedUser.username){
        return {
          message:"Username is already in use",
          status: 400
        };
      }
    }

    const newUser = await UserModel.create({
      firstName: sanitizedUser.firstName,
      lastName: sanitizedUser.lastName,
      username: sanitizedUser.username,
      email: sanitizedUser.email,
      password: hashedPassword,
      token: sanitizedUser.token,
      location:{
        type:"Point",
        coordinates:[sanitizedUser.long,sanitizedUser.lat]
      },
      // isAdmin: sanitizedUser.isAdmin,
    });

    console.log(newUser,"newUser")

    if (!newUser) throw new HttpException("user not created", 404);

    return {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      email: newUser.email,
      location: newUser.location,
      token: newUser.token,
      status: 200
      // isAdmin: newUser.isAdmin,
      // token: generateToken({
      //   _id: newUser._id,
      //   username: newUser.username,
      //   email: newUser.email,
      //   isAdmin: newUser.isAdmin
      // }),
    }
  } catch (err) {
    throw new HttpException(`failed to create user ${err.message}`, 400);
  }
}
export async function getUserByLatLong(userId:string,lat: number,long: number){

  try {
    const result = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          "location.coordinates": [long,lat]
        }
      },
      { new: true }
    );
    if (!result) throw new HttpException("User not found", 404);

    const nearByUser = await UserModel.aggregate( [{
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [long, lat]
        },
        distanceField: "distance",
        minDistance: 0,
        maxDistance: 1000,
        spherical: true,
        key: "location.coordinates"  // Specify the path to the coordinates within your documents
      }
    }]);
    console.log(nearByUser.length,"nearByUser");

    // return nearByUser;

    
      
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    // });

    const registrationTokens = nearByUser.map(user => user.token);
    
    if (registrationTokens.length > 0) {
      const message = {
        tokens: registrationTokens,
        notification: {
          title: 'We are close!',
          body: 'Let\'s meet up!',
        },
        // topic: "User coming in radius..."
        data: { type: 'nearby_update' } || {},
      };

      const sendMess = await admin.messaging().sendMulticast(message);
      console.log('Messages sent:', sendMess.successCount);
      console.log('Failures:', sendMess.failureCount);
      console.log('Errors:', sendMess.responses);
      return sendMess;
    }

  } catch (err) {
    throw new HttpException(`failed to create user ${err.message}`, 400);
  }
}

export async function getUserById(userId: string): Promise<IUserSchema> {
  checkIsValidObjectId(userId);
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new HttpException("user not found", 404);
    return user;
  } catch (err) {
    throw new HttpException("Error finding user", 400);
  }
}
export async function getUser(){
  try {
    const user = await UserModel.find();
    if (!user) throw new HttpException("user not found", 404);
    return user;
  } catch (err) {
    throw new HttpException("Error finding user", 400);
  }
}

// export async function loginUser(
//   email: string,
//   password: string
// ): Promise<UserReturnType> {
//   const sanitizedUser = await sanitizeLoginUser(email, password);
//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) throw new HttpException("User not found", 401);

//     const isPasswordValid = await bcrypt.compare(
//       sanitizedUser.password,
//       user.password
//     );
//     if (!isPasswordValid) throw new HttpException("Password is invalid", 401);

//     return {
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       lat: user.lat,
//       long: user.long,
//       // token: generateToken({
//       //   _id: user._id,
//       //   username: user.username,
//       //   email: user.email,
//       //   isAdmin: user.isAdmin
//       // }),
//     }
//   } catch (err) {
//     throw new HttpException(`Failed to login user: ${err.message}`, 401);
//   }
// }



export async function deleteUser(userId: string): Promise<IUserSchema> {
  checkIsValidObjectId(userId);
  try {
    const deleteUser = await UserModel.findByIdAndDelete(userId);
    if (!deleteUser) throw new Error("Error Deleting user");
    return deleteUser;
  } catch (err) {
    throw new HttpException(`failed to delete user ${err.message}`, 400);
  }
}
