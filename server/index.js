const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/crud')

app.post('/createUser', async (req, res) => {
    UserModel.create(req.body)
        .then(users => res.status(201).json(users))
        .catch(error => res.status(500).send('Error creating user: ' + error.message));
});

app.get('/', async (req, res) => {
    UserModel.find({})
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).send('Error fetching users: ' + error.message));
});

app.get('/getUser/:id', async (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})  
    .then(users => res.status(200).json(users))
        .catch(error => res.status(500).send('Error fetching users: ' + error.message));
});

app.put('/updateUser/:id', async (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {name: req.body.name, email: req.body.email, age: req.body.age })
    .then(users => res.status(200).json(users))
        .catch(error => res.status(500).send('Error updating user: ' + error.message));
});


app.delete('/deleteUser/:id', async (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).send('Error deleting user: ' + error.message));
});

app.listen(3001, () => {
    console.log('Server is running on port:',port);
});

