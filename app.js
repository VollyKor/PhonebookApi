const createError = require("http-errors");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
const notesRouter = require("./routes/notes");
const contactRouter = require("./routes/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());

// static folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/users", usersRouter);
app.use("/contacts", contactRouter);
app.use("/notes", notesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found app" });
});

app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400);
    res.json(err);
    return;
  }

  res.status(500).json({ message: err.message });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
