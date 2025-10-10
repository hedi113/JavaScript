import { Router } from "express";
import * as userDb from "../data/user.js"

const router = Router();


router.get("/", (req, res) => {
    const users = userDb.getUsers();
    res.status(200).json(users);
});

router.get("/:id", (req, res) => {
    const user = userDb.getUserById(+req.params.id);
    if(!user) {
        return res.status(404).json({message: "User not found!"});
    }
    res.status(200).json(user);
})

router.post("/", (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message: "Invalid credentials!"});
    }
    const savedUser = userDb.saveUser(name, email, password);
    res.status(201).json({id: savedUser.lastInsertRowid, name, email, password});
});

router.put("/:id", (req, res) => {
    const user = userDb.getUserById(+req.params.id);
    if(!user) {
        return res.status(404).json({message: "User not found!"});
    }
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message: "Invalid credentials!"});
    }
    const updatedUser = userDb.updateUser(+user.id, name, email, password);
    res.status(200).json(updatedUser);
});

router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    userDb.deleteUser(id);
    res.status(200).json({message: "User deleted!"});
});

export default router;