const express = require("express");
const router = express.Router();
const user = require("../../controllers/users");
const validate = require("./validate");
const upload = require("../../helpers/upload");
const guard = require("../../helpers/guard");

router.post("/registration", validate.validateRegistration, user.reg);
router.post("/login", validate.validateLogin, user.login);
router.post("/logout", guard, user.logout);

router.get("/current", guard, user.current);
router.get("/verify/:token", user.verify);

router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validate.UploadAvatar],
  user.avatar
);

module.exports = router;
