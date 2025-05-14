import express from 'express';
import cors from 'cors';
import { dbAll, initDb, dbGet, dbRun } from './util/database.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/albums', async (req, res) => {
    const albums = await dbAll("SELECT * FROM albums");
    return res.status(200).json(albums);
});

app.post('/albums', async (req, res) => {
    const {name, bandName, releaseYear, numberOfSongs} = req.body;
    if(!name || !bandName || !releaseYear || !numberOfSongs) {
        return res.status(404).json({message: "Missing data!"});
    } 

    if(req.body.releaseYear < 1940) {
        return res.status(404).json({ error: "Year field has to be greater than 1940" });
    }

    if(req.body.numberOfSongs <= 0) {
      return res.status(404).json({ error: "Number of songs must be greater than 0" });
    }

    const result = await dbRun(`INSERT INTO albums (name, bandName, releaseYear, numberOfSongs) VALUES (?, ?, ?, ?);`, [name, bandName, releaseYear, numberOfSongs]);
    res.status(201).json(result);
})

app.patch('/albums/:id', async (req, res) => {
    const id = req.params.id;
    const {} = req.body;

    const album = await dbGet("SELECT * FROM albums WHERE id = ?;", [id]);
    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    if(req.params.releaseYear < 1940) {
        return res.status(404).json({ error: "Year field has to be greater than 1940" });
    }

    if(req.params.numberOfSongs <= 0) {
      return res.status(404).json({ error: "Number of songs must be greater than 0" });
    }

    let name = req.body.name || album.name;
    let bandName = req.body.bandName || album.bandName;
    let releaseYear = req.body.releaseYear || album.releaseYear;
    let numberOfSongs = req.body.numberOfSongs || album.numberOfSongs;

    await dbRun("UPDATE albums SET name = ?, bandName = ?, releaseYear = ?, numberOfSongs = ?, id = ?;", [name, bandName, releaseYear, numberOfSongs, id]);

    res.status(200).json(album);
});

app.delete('/albums/:id', async (req, res) => {
    const id = req.params.id;
    const albums = await dbAll("SELECT * FROM albums");
    if (!albums) {
      return res.status(404).json({ error: "Album not found" });
    }
    await dbRun("DELETE FROM albums WHERE id = ?", [id]);
    res.status(200).json({message: "Album deleted!"});
});

app.use((err, req, res, next) => {
    console.error(err); 
    res.status(500).json({ message: `Error: ${err.message}` });
});


async function startServer() {
    await initDb();
    app.listen(3000, () => {
        console.log("Fut a szerver 3000-en");
    });
}


startServer();