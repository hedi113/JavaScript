import sqlite from 'sqlite3';

const db = new sqlite.Database('./data/database.sqlite');

export function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if(err) reject(err);
            else resolve(row);
        });
    });
}

export function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if(err) reject(err);
            else resolve(this);
        });
    });
}

export async function initDb() {
    await dbRun("DROP TABLE IF EXISTS albums");
    await dbRun("CREATE TABLE IF NOT EXISTS albums (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, bandName TEXT, releaseYear INTEGER, numberOfSongs INTEGER);");

    const albums = [];

    for(const album of albums) {
        await dbRun("INSERT INTO albums (name, bandName, releaseYear, numberOfSongs) VALUES (?, ?, ?, ?);", 
            [
                album.name,
                album.bandName,
                album.releaseYear,
                album.numberOfSongs
            ]);
    }
}