async function getCar() {  
    fetch('https://surveys-5jvt.onrender.com/api/cars/')
    .then(response => response.json())
    .then(car => {
        console.log(car);

        car.forEach(element => {
            console.log(`Id: ${element.id} 
                Model: ${element.model} 
                Brand: ${element.brand} 
                Year: ${element.year}`)
        }); 
});
}

async function getCarById(carId) {  
    fetch(`https://surveys-5jvt.onrender.com/api/cars/${carId}`)
    .then(response => response.json())
    .then(car => {
            console.log(`Id: ${car.id} 
                Model: ${car.model} 
                Brand: ${car.brand} 
                Year: ${car.year}`)
         
    });
}

async function createCar(carModel, carBrand, carYear) {  
    fetch(`https://surveys-5jvt.onrender.com/api/cars/`, {
        method: "POST",
        body: JSON.stringify({ 
          model: carModel,
          brand: carBrand,
          year: carYear
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(console.log(response));
}

async function updateCar(newModel, newBrand, newYear) {
    fetch(`https://surveys-5jvt.onrender.com/api/cars/`, {
        method: "PUT",
        body: JSON.stringify({ 
          model: newModel,
          brand: newBrand,
          year: newYear
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(console.log(response));
}

async function deleteCar(carId) {  
    fetch(`https://surveys-5jvt.onrender.com/api/cars/${carId}`, {
        method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(json => console.log(json));
    
}

console.log(await getCarById(1));