const express = require("express");
const router = express.Router();
const Note = require("../../controllers/notes");

router.get("/", Note.getAll);
router.post("/", Note.createNote);

module.exports = router;
