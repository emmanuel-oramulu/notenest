const express = require('express');
const router = express.Router();
const validateNote = require('../middlewares/validateNote');
const generateId = require('../utils/idGenerator');

let notes = [{
  id: 1,
  title: 'Grocery List',
  body: 'Eggs, milk, bread, and peanut butter'
},
  {
    id: 2,
    title: 'Project Idea',
    body: 'Build a CLI tool that generates Express boilerplate code'
  },
  {
    id: 3,
    title: 'Gym Reminder',
    body: 'Chest and triceps on Monday, back and biceps on Wednesday'
  },
];

router.get('/', (req, res) => {
  res.json(notes);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const noteId = notes.findIndex(n => n.id === id);
  if (noteId === -1) {
    const err = new Error('Note not found');
    err.status = 404;
    return next(err);
  }

  res.status(200).json(notes[noteId]);
});

router.post('/', validateNote, (req, res, next) => {
  const id = generateId(notes);
  const note = {
    id,
    title: req.body.title,
    body: req.body.body,
  };

  notes.push(note);
  res.status(201).json(note);
});

router.put('/:id', validateNote, (req, res, next) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  if (!note) {
    const err = new Error('Note not found');
    err.status = 404;
    return next(err);
  }

  note.title = req.body.title;
  note.body = req.body.body;

  res.status(200).json(note);
});

router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const noteId = notes.findIndex(n => n.id === id);

  if (noteId === -1) {
    const err = new Error('Note not found');
    err.status = 404;
    return next(err);
  }

  notes.splice(noteId, 1);
  res.status(204).end();
});

module.exports = router;