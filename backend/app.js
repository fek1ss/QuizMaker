const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Чтобы парсить JSON в теле запроса

const authRoutes = require('./routes/authRoutes'); 
app.use('/api/auth', authRoutes);

const testRoutes = require('./routes/testRoutes');
app.use('/api/tests', testRoutes);

const questionRoutes = require("./routes/questionRoutes");
app.use("/api/questions", questionRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

module.exports = app;
