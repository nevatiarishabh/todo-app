const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = {};
let todos = {};

// Register
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).send('User already exists');
    }
    users[username] = { password };
    todos[username] = [];
    res.status(201).send('User registered successfully');
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        return res.status(200).json({ message: 'Login successful' });
    }
    res.status(400).send('Invalid credentials. Click Register.');
});

// Get Todos
app.get('/todos/:username', (req, res) => {
    const { username } = req.params;
    res.json(todos[username] || []);
});

// Add Todo
app.post('/todos', (req, res) => {
    const { username, todo } = req.body;
    todos[username].push(todo);
    res.status(201).json(todos[username]);
});

// Update Todo
app.put('/todos/:username/:index', (req, res) => {
    const { username, index } = req.params;
    const { todo } = req.body;
    todos[username][index] = todo;
    res.status(200).json(todos[username]);
});

// Delete Todo
app.delete('/todos/:username/:index', (req, res) => {
    const { username, index } = req.params;
    todos[username].splice(index, 1);
    res.status(200).json(todos[username]);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
