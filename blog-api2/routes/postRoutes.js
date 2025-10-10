import { Router } from "express";
import * as postDb from "../data/post.js";
import { getUserById } from "../data/user.js";
const router = Router();

router.get("/", (req, res) => {
    const posts = postDb.getPosts();
    res.status(200).json(posts);
});

router.get("/:id", (req, res) => {
    const post = postDb.getPostById(+req.params.id);
    if(!post) {
        return res.status(404).json({message: "Post not found!"});
    }
    res.status(200).json(post);
})

router.post("/", (req, res) => {
    let {userId, title, content} = req.body;
    if(!userId || !title || !content) {
        return res.status(400).json({message: "Invalid credentials!"});
    }
    const user = getUserById(userId);
    if(!user) {
        return res.status(404).json({message: "No user with this id!"});
    }
    userId = user.id;
    const savedPost = postDb.savePost(userId, title, content);
    res.status(201).json({id: savedPost.lastInsertRowid, title, content});
});

router.put("/:id", (req, res) => {
    const post = postDb.getPostById(+req.params.id);
    if(!post) {
        return res.status(404).json({message: "Post not found!"});
    }
    const {userId, title, content} = req.body;
    if(!userId || !title || !content) {
        return res.status(400).json({message: "Invalid credentials!"});
    }
    const user = getUserById(userId);
    if(!user) {
        return res.status(404).json({message: "No user with this id!"});
    }
    const updatedPost = postDb.updatePost(+post.id, title, content);
    res.status(200).json(updatedPost);
});

router.delete("/:id", (req, res) => {
    const id = +req.params.id;
    postDb.deletePost(id);
    res.status(200).json({message: "Post deleted!"});
});

export default router;