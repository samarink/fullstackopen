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

app.get('/info', (_, res) => {
  Person.estimatedDocumentCount({}).then((count) =>
    res.send(
      `Phone book has info for ${count} people
        ${new Date().toUTCString()}`
    )
  );
});

app.get('/api/persons', (_, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name must be present' });
  }

  if (!number) {
    return res.status(400).json({ error: 'number must be present' });
  }

  const person = new Person({ name, number });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  const person = { name, number };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err));
});

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (err, _, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
