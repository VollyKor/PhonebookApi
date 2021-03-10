const Notes = require("../model/notes");

const getAll = async (req, res, next) => {
  try {
    const notes = await Notes.getAll();

    return res.status(200).json({
      status: "success",
      code: 200,
      data: notes,
    });
  } catch (e) {
    next(e);
  }
};

const createNote = async (req, res, next) => {
  try {
    const data = req.body;
    const newNote = await Notes.create(data);
    return res.status(200).json({
      status: "success",
      code: 201,
      data: newNote,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  createNote,
};
