const express = require('express');
const Note = require('../models/note');
const router = express.Router();
const withAuth = require("../middlewares/auth");
require("dotenv").config();

//Rota para criar uma nota
router.post("/create", withAuth, async (req, res) => {

    const { title, body } = req.body;

    try {

        const note = await Note.create({ title, body, author: req.user._id });
        res.status(201).json(note);

    } catch (error) {
        return res.status(400).json({
            message: "Failed a create the new note",
            error
        })
    }

})

//Pesquisa de notas
router.get("/search", withAuth, async (req, res) => {

    const {query} = req.query;

    try {
        let note = await Note.find({author: req.user._id, $text: {$search: query}})
        if(note.length === 0){
            return res.status(200).json({message: "Not results found"})
        }
        return res.status(200).json(note);
    } catch (error) {
        return res.status(400).json({
            message: "Failed to search note",
            error
        })
    }
})

//Rota para pegar apenas uma nota com determinado ID
router.get("/:id", withAuth, async (req, res) => {

    const noteId = req.params.id;
    const userId = req.user._id;

    try {

        let note = await Note.find({ _id: noteId, author: userId });
        return res.status(200).json(note);

    } catch (error) {
        return res.status(400).json({
            message: "Failed to get note",
            error
        })
    }

});

//rota para listar notas de um user
router.get("/", withAuth, async (req, res) => {

    try {
        let note = await Note.find({ author: req.user._id });
        return res.status(200).json(note);
    } catch (error) {
        return res.status(400).json({
            message: "Failed search the list of notes",
            error
        })
    }

})

//Rota para modificar nota
router.put("/:id", withAuth, async (req, res) => {

    const { title, body } = req.body;
    const id = req.params.id
    try {
        await Note.findByIdAndUpdate(id, { title, body });
        return res.status(200).json({ message: "Note updated with success" });
    } catch (error) {
        return res.status(400).json({
            message: "Failed update the note",
            error
        })
    }

})

//Rota para deletar nota
router.delete("/:id", withAuth, async (req, res) => {

    const id = req.params.id;

    try {
        await Note.findByIdAndDelete(id);
        return res.status(200).json({ message: "Note Deleted with success" });
    } catch (error) {
        return res.status(400).json({
            message: "Failed delete the note",
            error
        })
    }

})

module.exports = router;