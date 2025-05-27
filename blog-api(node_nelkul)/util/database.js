import Database from 'better-sqlite3';




const db = new Database('./data/database.sqlite');

db.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING)').run();

db.prepare('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, creatorId INTEGER, title STRING, category STRING, content STRING, creationDate STRING, lastModified STRING)').run();

export const getUsers = () => db.prepare('SELECT * FROM users').all();

export const getUser = (id) => db.prepare('SELECT * FROM users WHERE id = ?').get(id);

export const getPosts = () => db.prepare('SELECT * FROM posts').all();

export const getPostsByCrId = (id) => db.prepare('SELECT * FROM posts WHERE creatorId = ?').run(id);

export const getPost = (id) => db.prepare('SELECT * FROM posts WHERE id = ?').run(id);

export const createPost = (creatorId, title, category, content, creationDate, lastModified) => db.prepare('INSERT INTO posts (creatorId, title, category, content, creationDate, lastModified) VALUES (?,?,?,?,?,?)').run(creatorId, title, category, content, creationDate, lastModified);

export const saveUser = (name) => db.prepare('INSERT INTO users (name) VALUES (?)').run(name)

export const editPost = (id, creatorId, title, category, content, creationDate, lastModified) => db.prepare('UPDATE posts SET creatorId = ?, title = ?, category = ?, content = ?, creationDate = ?, lastModified = ? WHERE id = ?').run(creatorId, title, category, content, creationDate, lastModified, id);

export const deletePost = (id) => db.prepare('DELETE FROM posts WHERE id = ?').run(id);

const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;

const postCount = db.prepare('SELECT COUNT(*) AS count FROM posts').get().count;


if (userCount === 0) {
    const users = [
        { name: "user1" },
        { name: "user2" },
        { name: "user3" },
    ];
    for (const user of users) saveUser(user.name); 
}

if (postCount === 0) {
    const posts = [
        {creatorId: 1, title: "default1", category: "default", content: "default post", creationDate: new Date().toISOString().replace('T', ' ').slice(0, 16), lastModified: new Date().toISOString().replace('T', ' ').slice(0, 16)},
        {creatorId: 1, title: "default1", category: "default", content: "default post", creationDate: new Date().toISOString().replace('T', ' ').slice(0, 16), lastModified: new Date().toISOString().replace('T', ' ').slice(0, 16)},
        {creatorId: 2, title: "default2", category: "default", content: "default post", creationDate: new Date().toISOString().replace('T', ' ').slice(0, 16), lastModified: new Date().toISOString().replace('T', ' ').slice(0, 16)},
        {creatorId: 2, title: "default2", category: "default", content: "default post", creationDate: new Date().toISOString().replace('T', ' ').slice(0, 16), lastModified: new Date().toISOString().replace('T', ' ').slice(0, 16)},
        {creatorId: 3, title: "default3", category: "default", content: "default post", creationDate: new Date().toISOString().replace('T', ' ').slice(0, 16), lastModified: new Date().toISOString().replace('T', ' ').slice(0, 16)},
        {creatorId: 3, title: "default3", category: "default", content: "default post", creationDate: new Date().toISOString().replace('T', ' ').slice(0, 16), lastModified: new Date().toISOString().replace('T', ' ').slice(0, 16)},
    ];
    for (const post of posts) createPost(post.creatorId, post.title, post.category, post.content, post.creationDate, post.lastModified); 
}