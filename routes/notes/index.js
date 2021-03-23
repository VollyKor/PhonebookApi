const express = require("express");
const router = express.Router();
const Note = require("../../controllers/notes");
const validate = require("./validation");
const guard = require("../../helpers/guard");

router
  .get("/", guard, Note.getAll)
  .post("/", guard, validate.addNote, Note.createNote);

router
  .patch("/:noteId", guard, validate.changeNote, Note.changeNote)
  .delete("/:noteId", guard, Note.removeNote);

module.exports = router;
