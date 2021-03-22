const express = require("express");
const router = express.Router();
const Note = require("../../controllers/notes");
const guard = require("../../helpers/guard");

router
  .get("/", guard, Note.getAll)
  .post("/", guard, Note.createNote)
  .patch("/", guard, Note.changeNote)
  .delete("/", guard, Note.removeNote);

module.exports = router;
