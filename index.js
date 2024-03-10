import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

import Note from './models/note.js' 

  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

  app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
      response.json(note)
    })
  })
  
  // DELETE a note by ID from mongodb
app.delete('/api/notes/:id', async (request, response) => {
  try {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// POST a new note to mongoDB
app.post('/api/notes', async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: 'Content missing' });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
