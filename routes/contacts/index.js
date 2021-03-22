const express = require("express");
const router = express.Router();
const validate = require("./validate");
const Contacts = require("../../controllers/contacts");
const guard = require("../../helpers/guard");

router.get("/", guard, Contacts.getAll).post("/", guard, Contacts.add);

router
  .get("/:contactId", guard, Contacts.getById)
  .delete("/:contactId", guard, Contacts.remove)
  .patch("/:contactId", guard, Contacts.update);

router
  .get("/", guard, Contacts.getAll)
  .post("/", guard, validate.AddContact, Contacts.add);

router
  .get("/:contactId", guard, Contacts.getById)
  .delete("/:contactId", guard, Contacts.remove)
  .patch("/:contactId", guard, validate.UpdateContact, Contacts.update);

module.exports = router;
