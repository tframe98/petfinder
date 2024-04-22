//basic server setup

const express = require('express');
const { pets } = require('./data');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// define All API endpoints

//get all pets 

app.get('/api/v1/pets', (req, res) => {
  res.status(200).json(pets);
});

//get pet by name

app.get('/api/v1/pets/:name',(req, res) => {
  const {name} = req.params;
  const pet = pets.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (pet) {
    res.status(200).json(pet);
  } else {
    res.status(404).send('Pet not found');
  }
});

//get pet by owners name

app.get('/api/v1/pets/owner', (req, res) => {
  const {owner} = req.query;
  const pet = pets.find(p => p.owner.toLowerCase() === owner.toLowerCase());
  if (pet) {
    res.status(200).json(pet);
  } else {
    res.status(404).send('Owner not found');
  }
});

//server client homepage

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//start the server

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



