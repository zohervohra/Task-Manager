const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fetchUserMiddleware = require('../middleware/fetchUser');

// Subnotes CRUD endpoints

// GET /api/subnotes/fetchAllSubNotes/:noteId - Fetch all subnotes for a specific note
router.get('/fetchAllSubNotes/:noteId', fetchUserMiddleware, async (req, res) => {
    try {
        const subnotes = await prisma.subNote.findMany({
            where: {
                noteId: parseInt(req.params.noteId),
            },
        });
        res.json(subnotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal error occurred' });
    }
});

// POST /api/subnotes/addSubNote/:noteId - Add a new subnote to a specific note
router.post('/addSubNote/:noteId', fetchUserMiddleware, [
    body('title', 'Enter title with at least 3 letters').isLength({ min: 3 }),
    // No validation for description as it is optional
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tags } = req.body;

    try {
        const newSubNote = await prisma.subNote.create({
            data: {
                title,
                description, // Can be undefined or null
                tags,
                noteId: parseInt(req.params.noteId),
            },
        });

        res.json(newSubNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal error occurred' });
    }
});

// PUT /api/subnotes/updateSubNote/:id - Update an existing subnote
router.put('/updateSubNote/:id', fetchUserMiddleware, async (req, res) => {
    const { title, description, tags } = req.body;

    try {
        const updatedSubNote = await prisma.subNote.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                title,
                description, // Can be updated to undefined or null
                tags,
            },
        });

        res.json(updatedSubNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal error occurred' });
    }
});

// DELETE /api/subnotes/deleteSubNote/:id - Delete a subnote
router.delete('/deleteSubNote/:id', fetchUserMiddleware, async (req, res) => {
    try {
        const deletedSubNote = await prisma.subNote.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });

        res.json(deletedSubNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal error occurred' });
    }
});

module.exports = router;
