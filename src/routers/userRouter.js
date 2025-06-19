import express from "express";
import { createUserController } from "../controller/Users/createUserController.js";
import { findAllUsersController } from "../controller/Users/findAllUserController.js";
import { findUserByIdController } from "../controller/Users/findUserByIdController.js";
import { updateUserController } from "../controller/Users/updateUserController.js";
import { removeUserController } from "../controller/Users/removeUserController.js";
import { loginUserController } from "../controller/Users/loginUserController.js";

const router = express.Router();

router.get("/", findAllUsersController);
router.get("/find/:id", findUserByIdController);
router.post("/create", createUserController);
router.put("/update/:id", updateUserController);
router.delete("/delete/:id", removeUserController);
router.post("/login", loginUserController);

export default router;
