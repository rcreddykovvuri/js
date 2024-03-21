const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // Replace with your MySQL username
    password: 'ravi', // Replace with your MySQL password
    database: 'mysql'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.get('/questions', (req, res) => {
    let user = req.body;
    let sql = 'select * from questions_node';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Create a question
app.post('/create', (req, res) => {
    const { type, difficulty, category, question, correct_answer, incorrect_answers } = req.body;
    const sql = 'INSERT INTO questions_node (type, difficulty, category, question, correct_answer, incorrect_answers) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [type, difficulty, category, question, correct_answer, incorrect_answers], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Error creating user' });
            return;
        }
        res.status(201).json({ message: 'question created successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
