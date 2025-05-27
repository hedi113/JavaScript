import express from "express";
import cors from 'cors';
import * as db from './util/database.js';

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', (req, res) => {
    try {
        const users = db.getUsers();
        return res.status(200).json(users);
    }
    catch (err){
        res.status(500).json({message: `${err}`});
    }
});

app.get('/users/:id', (req, res) => {
    try {
        const user = db.getUser(req.params.id);    
        if(!user) {
            return res.status(404).json({message: "User not found!"});
        }
        return res.status(200).json(user);
    }
    catch (err){
        res.status(500).json({message: `${err}`});
    }
});

app.get('/posts', (req, res) => {
    try {
        const posts = db.getPosts();
        return res.status(200).json(posts);
    }
    catch (err){
        res.status(500).json({message: `${err}`});
    }
});

app.get('/posts/:id', (req, res) => {
    try {
        const post = db.getPost(req.params.id);    
        if(!post) {
            return res.status(404).json({message: "Post not found!"});
        }
        return res.status(200).json(post);
    }
    catch (err){
        res.status(500).json({message: `${err}`});
    }
})

app.post('/posts', (req, res) => {
    try {
        const {creatorId, title, category, content, creationDate, lastModified} = req.body;
        if(!title || !category || !content) {
            return res.status(400).json({message: "Invalid credentials!"});
        }
        const savedPost = db.createPost(creatorId, title, category, content, creationDate, lastModified);
        if(savedPost.changes != 1) {
            return res.status(501).json({message: "Failed to save post!"});
        }
        return res.status(201).json({id: savedPost.lastInsertRowid, creatorId, title, category, content, creationDate, lastModified});
    }
    catch (err){
        res.status(500).json({message: `${err}`});
    }
});

app.patch('/posts/:id', (req, res) => {
    try {
        const id = +req.params.id;
        const {} = req.body;
        
        const post = db.getPost(id);

        if(!post) {
            return res.status(404).json({message: "Post not found!"});
        }

        let creatorId = post.creatorId;
        let title = req.body.title || post.title;
        let category = req.body.category || post.category;
        let content = req.body.content || post.content;
        let creationDate = post.creationDate;
        let lastModified = req.body.lastModified || post.lastModified;

        const updatedPost = db.editPost(id, creatorId, title, category, content, creationDate, lastModified);
        
        if(updatedPost.changes != 1) {
            return res.status(501).json({message: "Post update failed!"});
        }
        return res.status(201).json({id, creatorId, title, category, content, creationDate, lastModified});
    }
    catch (err){
        res.status(500).json({message: `${err}`});
    }
});

app.delete('/posts/:id', (req, res) => {
    try {
        const deletedPost = db.deletePost(req.params.id);
        if(deletedPost.changes != 1) {
            return res.status(501).json({message: "Failed to delete post!"});
        }
        return res.status(201).json({message: "Post deleted!"});
    }
    catch (err){
        res.status(500).json({message: `${err}`});
    }
});

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});
