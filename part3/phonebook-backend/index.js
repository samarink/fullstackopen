require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body, null, 2));
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] \n:body'
  )
);

const alreadyInPhonebook = (name) => persons.some((p) => p.name === name);

app.get('/info', (_, res) => {
  const responseStr = `
    Phonebook has info for ${persons.length} people
    ${new Date().toGMTString()}
  `;
  res.send(responseStr);
});

app.get('/api/persons', (_, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name must be present' });
  }

  if (!number) {
    return res.status(400).json({ error: 'number must be present' });
  }

  if (alreadyInPhonebook(name)) {
    return res
      .status(400)
      .json({ error: `${name} is alredy added to the phonebook` });
  }

  const person = {
    id: generateId(),
    name,
    number,
  };

  persons = [...persons, person];
  res.json(person);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
