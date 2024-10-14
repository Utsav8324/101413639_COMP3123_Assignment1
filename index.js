const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection string with the correct password
const DB_URL = "mongodb+srv://Assignment1utsavlaptop8324:3jAsP67YNg6oHewV@cluster0.jnv4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to the database!"))
    .catch(err => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
    });

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp/employees', employeeRoutes);

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});