import express from 'express';
import movies from './data/movies.js';

const app = express();
app.use(express.json());

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    if(id < 0 || id >= movies.length) {
        return res.status(404).json({message: "No movie with this id"});
    }
    res.status(200).json(movies[id]);
});

app.post('/movies', (req, res) => {
    const {title, producer, releaseYear, oscar} = req.body;
    if(!title || !producer || !releaseYear || !oscar) {
        return res.status(400).json({message: "Missing data!"});
    }
    const newMovie = {title, producer, releaseYear, oscar};
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
    const id = req.params.id;
    if(id < 0 || id >= movies.length) {
        return res.status(404).json({message: "No movie with this id"});
    };
    const {title, producer, releaseYear, oscar} = req.body;
    if(!title || !producer || !releaseYear || !oscar) {
        return res.status(400).json({message: "Missing data!"});
    };

    movies[id] = {title, producer, releaseYear, oscar};
    res.status(200).json(movies[id]);

});

app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    if(id < 0 || id >= movies.length) {
        return res.status(404).json({message: "No movie with this id"});
    };

    movies.splice(id, 1);
    res.status(200).json({message: "Delete succesful!"});
});

app.listen(3000, () => {
    console.log("Szerver fut 3000en");
});