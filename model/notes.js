const Note = require("./schema/note.js");

const getAll = async () => {
  const note = await Note.find();
  return note;
};

const create = async ({ title, text = "" }) => {
  const note = new Note({ title, text });
  return note.save();
};

module.exports = {
  getAll,
  create,
};
