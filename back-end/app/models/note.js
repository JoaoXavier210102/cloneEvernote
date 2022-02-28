const mongoose = require("mongoose");

let noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    createdAt: {
        type: Date, 
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

noteSchema.index({"title": "text", "body": "text"});

const Note = mongoose.model("Note", noteSchema)

module.exports = Note;