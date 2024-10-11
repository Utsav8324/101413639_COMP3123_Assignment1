const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const app = express();
const PORT = process.env.PORT || 8081;

// MongoDB connection string
const DB_URL = "mongodb+srv://KaranParmar:tnb67tQwfIGhD8d2@cluster0.hr7uu.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority";

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

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



// {
//     "_id": "6709935aca105471db98e6dc",
//     "first_name": "Sarah",
//     "last_name": "Smith",
//     "email": "sarah.smith@example.com",
//     "position": "Manager",
//     "salary": 80000,
//     "date_of_joining": "2023-10-10T00:00:00.000Z",
//     "department": "Finance",
//     "created_at": "2024-10-11T21:06:34.807Z",
//     "updated_at": "2024-10-11T21:06:34.807Z",
//     "__v": 0
// },
// {
//     "_id": "67099615ca105471db98e6e5",
//     "first_name": "Sarah",
//     "last_name": "Smith",
//     "email": "sarah.smith@example.com",
//     "position": "Manager",
//     "salary": 80000,
//     "date_of_joining": "2023-10-10T00:00:00.000Z",
//     "department": "Finance",
//     "created_at": "2024-10-11T21:18:13.556Z",
//     "updated_at": "2024-10-11T21:18:13.556Z",
//     "__v": 0
// },
// {
//     "_id": "67099625ca105471db98e6e7",
//     "first_name": "Alice",
//     "last_name": "Smith",
//     "email": "alice.smith@example.com",
//     "position": "Designer",
//     "salary": 70000,
//     "date_of_joining": "2024-01-15T00:00:00.000Z",
//     "department": "Design",
//     "created_at": "2024-10-11T21:18:29.638Z",
//     "updated_at": "2024-10-11T21:18:29.638Z",
//     "__v": 0
// },
// {
//     "_id": "6709965cca105471db98e6e9",
//     "first_name": "Tom",
//     "last_name": "Brown",
//     "email": "tom.brown@example.com",
//     "position": "Data Analyst",
//     "salary": 70000,
//     "date_of_joining": "2024-05-15T00:00:00.000Z",
//     "department": "Analytics",
//     "created_at": "2024-10-11T21:19:24.674Z",
//     "updated_at": "2024-10-11T21:19:24.674Z",
//     "__v": 0
// },
// {
//     "_id": "67099669ca105471db98e6eb",
//     "first_name": "Michael",
//     "last_name": "Wilson",
//     "email": "michael.wilson@example.com",
//     "position": "DevOps Engineer",
//     "salary": 85000,
//     "date_of_joining": "2024-07-25T00:00:00.000Z",
//     "department": "Engineering",
//     "created_at": "2024-10-11T21:19:37.836Z",
//     "updated_at": "2024-10-11T21:19:37.836Z",
//     "__v": 0
// }
// ]