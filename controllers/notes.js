const Notes = require("../model/notes");
const { HttpCode } = require("../helpers/constants");

const getAll = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const notes = await Notes.getAll(userId);

    const filteredNotes = notes.map(({ _id, title, text }) => {
      return {
        id: _id,
        title,
        text,
      };
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      data: filteredNotes,
    });
  } catch (e) {
    next(e);
  }
};

const getbyId = async (req, res, next) => {
  // try {
  //   const id = req.body.id;
  //   const note = await Notes.update(id);
  //   return res.status(200).json({
  //     status: "success",
  //     code: 200,
  //     data: notes,
  //   });
  // } catch (e) {
  //   next(e);
  // }
};

const createNote = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    const { text, title, _id: id } = await Notes.add({
      ...data,
      owner: userId,
    });

    const responseNote = {
      text,
      title,
      id,
    };

    return res.status(200).json({
      status: "success",
      code: HttpCode.CREATED,
      data: responseNote,
    });
  } catch (e) {
    next(e);
  }
};

const changeNote = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.noteId;
    const data = req.body;
    const changedNote = await Notes.change(userId, noteId, data);

    if (changedNote) {
      return res.status(200).json({
        status: "success",
        code: HttpCode.OK,
        data: changedNote,
      });
    }

    return res.status(404).json({
      status: "error",
      code: 404,
      data: "Not found",
    });
  } catch (e) {
    next(e);
  }
};

const removeNote = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const noteId = req.params.noteId;
    await Notes.remove(userId, noteId);
    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  createNote,
  changeNote,
  removeNote,
};
