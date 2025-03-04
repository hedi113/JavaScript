import express from 'express'
import wizards from './data/wizards.js'

const app = express();

app.use(express.json());

app.get('/wizards', (req, res) => {
    res.status(200).json(wizards);
});

app.get('/wizards/:id', (req, res) => {
    const id = req.params.id;
    if(id < 0 || id >= wizards.length) {
        return res.status(404).json({message: "Wizard not found"});
    }
    res.status(200).json(wizards[id]);
});

app.post('/wizards', (req, res) => {
    const {name, magicWand, house} = req.body;
    if(!name || !magicWand || !house) {
        return res.status(400).json({message: "Missing data"});
    }
    const newWizard = {name, magicWand, house};
    wizards.push(newWizard);
    res.status(201).json(newWizard);
});

app.put('/wizards/:id', (req, res) => {
    const id = req.params.id;
    if(id < 0 || id >= wizards.length) {
        return res.status(404).json({message: "Wizard not found"});
    }
    const {name, magicWand, house} = req.body;
    if(!name || !magicWand || !house) {
        return res.status(400).json({message: "Missing data"});
    }
    
    wizards[id] ={name, magicWand, house};
    res.status(200).json(wizards[id]);
});

app.delete('/wizards/:id', (req, res) => {
    const id = req.params.id;
    if(id < 0 || id >= wizards.length) {
        return res.status(404).json({message: "Wizard not found"});
    }
    wizards.splice(id, 1);
    res.status(200).json({message: "Delete succesful"});
});


app.listen(3000, () => {
    console.log(`Server runs on port 3000`);
});

// szerver teszt >> nmp run dev

