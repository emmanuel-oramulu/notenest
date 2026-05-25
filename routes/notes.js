const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const validateNote = require('../middlewares/validateNote');
const generateId = require('../utils/idGenerator');

router.use(requireAuth);

let notes = [];

router.get('/', (req, res) => {
  const userNotes = notes.filter(n => n.userId === req.user.userId);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedNotes = userNotes.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: userNotes.length,
    totalPages: Math.ceil(userNotes.length / limit),
    data: paginatedNotes
  });
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const userNotes = notes.filter(n => n.userId === req.user.userId);

  const noteId = userNotes.findIndex(n => n.id === id);
  if (noteId === -1) {
    const err = new Error('Note not found');
    err.status = 404;
    return next(err);
  }

  res.status(200).json(userNotes[noteId]);
});

router.post('/', validateNote, (req, res, next) => {
  const id = generateId(notes);
  const note = {
    userId: req.user.userId,
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

  if (note.userId !== req.user.userId) {
    const err = new Error('Forbidden');
    err.status = 403;
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

  const note = notes[noteId];

  if (note.userId !== req.user.userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    return next(err);
  }

  notes.splice(noteId, 1);
  res.status(204).end();
});

module.exports = router;