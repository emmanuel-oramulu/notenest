# NoteNest 🪺

A simple REST API for creating, reading, updating, and deleting notes. Built with Node.js and Express — no database, just clean in-memory storage.

## Tech Stack

- **Node.js** — runtime
- **Express** — web framework
- **Helmet** — security headers
- **Morgan** — HTTP request logging
- **Nodemon** — dev auto-restart

## Project Structure

```
notenest/
├── index.js
├── routes/
│   └── notes.js
├── middlewares/
│   ├── validateNote.js
│   └── errorHandler.js
└── utils/
    └── idGenerator.js
```

## Getting Started

### Prerequisites

- Node.js installed
- npm installed

### Installation

```bash
git clone https://github.com/ORAMULU/notenest.git
cd notenest
npm install
```

### Run in development

```bash
npm run dev
```

### Run in production

```bash
npm start
```

Server runs on `http://localhost:7000`

## API Endpoints

Base URL: `/api/notes`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get a single note |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

## Request & Response Examples

### GET /api/notes

**Response**
```json
[
  { "id": 1, "title": "Grocery List", "body": "Eggs, milk, bread, and peanut butter" },
  { "id": 2, "title": "Project Idea", "body": "Build a CLI tool that generates Express boilerplate code" }
]
```

### POST /api/notes

**Request body**
```json
{
  "title": "My Note",
  "body": "Note content here"
}
```

**Response** `201 Created`
```json
{
  "id": 4,
  "title": "My Note",
  "body": "Note content here"
}
```

### PUT /api/notes/:id

**Request body**
```json
{
  "title": "Updated Title",
  "body": "Updated content"
}
```

**Response** `200 OK`
```json
{
  "id": 1,
  "title": "Updated Title",
  "body": "Updated content"
}
```

### DELETE /api/notes/:id

**Response** `204 No Content`

## Validation

POST and PUT requests require both fields:

| Field | Type | Rules |
|-------|------|-------|
| `title` | string | Required |
| `body` | string | Required |

Missing fields return `400 Bad Request` with a descriptive error message.

## Error Responses

All errors return JSON in this format:

```json
{
  "error": "Note not found",
  "status": 404
}
```

## Author

**Oramulu Emmanuel Onyebuchukwu**

## License

ISC
