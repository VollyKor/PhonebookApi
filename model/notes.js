const Note = require("./schema/note");

const getAll = async (userId) => {
  const Notes = await Note.find({ owner: userId });
  return Notes;
};

const getById = async (userId, contactId) => {
  const note = Note.findOne({ owner: userId, _id: contactId });
  return note.save();
};

const add = async (noteObj) => await Note.create(noteObj);

const change = async (userId, noteId, data) => {
  const changedNote = await Note.findOneAndUpdate(
    { owner: userId, _id: noteId },
    data,
    { new: true }
  );
  return changedNote;
};

const remove = async (userId, noteId) => {
  try {
    console.log(noteId);
    const deletedNote = await Note.findOneAndRemove({
      owner: userId,
      _id: noteId,
    });
    return deletedNote;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  change,
  remove,
};
