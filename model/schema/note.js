const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title required"],
    },
    text: {
      type: String,
      default: "",
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Note = model("note", noteSchema);

module.exports = Note;
