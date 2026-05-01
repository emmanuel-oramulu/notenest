Here's a project that uses everything you've covered.

---

### Build a Notes API

A simple REST API where you can create, read, update and delete notes. No database — just an array in memory.

---

### What you'll practise

- Express Router (splitting routes)
- Middleware (validation, logging)
- Error handling middleware
- Helmet
- All four HTTP methods (GET, POST, PUT, DELETE)
- Route parameters

---

### Structure

```
notes-api/
├── index.js
├── routes/
│   └── notes.js
└── middleware/
    ├── logger.js
    ├── validateNote.js
    └── errorHandler.js
```

---

### Requirements

**A note object looks like this:**
```js
{ id: 1, title: 'My note', body: 'Note content here' }
```

**Routes to build:**

| Method | URL | What it does |
|---|---|---|
| GET | `/notes` | Return all notes |
| GET | `/notes/:id` | Return one note |
| POST | `/notes` | Create a new note |
| PUT | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |

**Middleware to write:**

- `logger` — logs the method and URL of every request
- `validateNote` — checks that `title` and `body` exist on POST/PUT, rejects with `400` if not
- `errorHandler` — catches all errors, responds with `{ error, status }`

**Rules:**
- Use Helmet
- If a note isn't found, pass a `404` error to `next()`
- Keep fake data as an array at the top of your routes file

---

### Start here

```js
// index.js
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(express.json());

// your router and error handler go here

app.listen(3000, () => console.log('Notes API running'));
```

---

Build it step by step — start with `index.js`, then the middleware files, then the routes. Paste each file here as you finish it and I'll review it.