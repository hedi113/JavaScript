import express from 'express';

const port = 3000;
const app = express();

app.use(express.json());

let cars = [
    {id: 1, brand: "Suzuki", model: "Swift"},
    {id: 2, brand: "Peugeot", model: "407"},
    {id: 3, brand: "Dacia", model: "Duster"},
    {id: 4, brand: "Reno", model: "Twingo"}
]

app.get('/cars', (req, res) => {
    res.status(200).json(cars);
});

app.get('/cars/:id', (req, res) => {
    const id = +req.params.id;
    const car = cars.find(car => car.id === id);
    if(!car) {
        return res.status(404).json({message: "Car not found!"});
    }
    res.status(200).json(car);
});

app.post('/cars', (req, res) => {
    const {brand, model} = req.body;

    if(!brand || !model) {
        return res.status(400).json({message: "Invalid credentials!"});
    }
    const id = cars[cars.length - 1]?.id || 1;
    const newCar = {id, brand, model};
    cars.push(newCar);

    res.status(201).json(newCar);
});

app.put('/cars:id', (req, res) => {
    const id = +req.params.id;
    let car = cars.find(car => car.id === id);
    if(!car) {
        return res.status(404).json({message: "Car not found!"});
    }

    const {brand, model} = req.body;

    if(!brand || !model) {
        return res.status(400).json({message: "Invalid credentials!"});
    }

    car = {id: car.id, brand, model};
    const index = cars.indexOf(car);
    cars[index] = car;
    res.status(200).json(car);
});

app.delete('/cars/:id', (req, res) => {
    const id = +req.params.id;
    let car = cars.find(car => car.id === id);
    if(!car) {
        return res.status(404).json({message: "Car not found!"});
    }

    const index = cars.indexOf(car);
    cars.splice(index, 1);

    res.status(200).json({message: "Car deleted!"});
});

app.listen(port, () => {
    console.log(`Server runs on https://localhost:${port}`);
});