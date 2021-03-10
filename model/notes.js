const Note = require("./schema/note");

const getAll = async () => {
  const note = await Note.find();
  return note;
};

const create = async ({ title, descr = "" }) => {
  const note = new Note({ title, descr });
  return note.save();
};

module.exports = {
  getAll,
  create,
};
