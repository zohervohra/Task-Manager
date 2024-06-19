const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fetchUserMiddleware = require('../middleware/fetchUser');




// GET /api/notes/fetchAllNotes - Fetch all notes for the logged-in user
router.get('/fetchAllNotes', fetchUserMiddleware, async (req, res) => {
    try {
      console.log(req.user)
    
      const notes = await prisma.Note.findMany({
        where: {
          user: {
            id: req.user.id,
          },
        },
      });
    //   const filteredNotes = notes.filter(note => note.userId === req.user.id);

    // res.json(filteredNotes);
    res.json(notes);
      

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal error occurred' });
    }
  });
  
  // POST /api/notes/addNote - Add a new note for the logged-in user
  router.post('/addNote', fetchUserMiddleware, [
    body('title', 'Enter title with at least 3 letters').isLength({ min: 3 }),
    body('description', 'Enter description with at least 5 letters').isLength({ min: 5 }),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { title, description, tags } = req.body;
    console.log(req.user)
    try {
      const newNote = await prisma.Note.create({
        data: {
          title,
          description,
          tags,
          userId: req.user.id,
        },
      });
  
      res.json(newNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal error occurred 4' });
    }
  });
  
  // PUT /api/notes/updateNote/:id - Update an existing note for the logged-in user
  router.put('/updateNote/:id', fetchUserMiddleware, async (req, res) => {
    const { title, description, tags } = req.body;
  
    try {
      const updatedNote = await prisma.Note.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          title,
          description,
          tags,
        },
      });
  
      res.json(updatedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal error occurred' });
    }
  });
  
  // DELETE /api/notes/deleteNote/:id - Delete a note for the logged-in user
  router.delete('/deleteNote/:id', fetchUserMiddleware, async (req, res) => {
    try {
      const deletedNote = await prisma.Note.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
  
      res.json(deletedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal error occurred' });
    }
  });


module.exports = router;
