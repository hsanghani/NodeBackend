import * as express from 'express';
const router = express.Router();
import {
    getAllusersHandler,
    createUserHandler,
    getUserHandler,
    getRadiusUserHandler,
    deleteUserHandler,
} from '../controllers/userController';
router
    .route('/')
    .get( getAllusersHandler)
    .post( createUserHandler);

router
    .route('/:id')
    .get(getUserHandler)
    .delete( deleteUserHandler);

router
    .route("/nearByUsers/:id")
    .put(getRadiusUserHandler);

module.exports = router; 
