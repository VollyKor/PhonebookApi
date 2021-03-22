const User = require("./schema/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};
const findByToken = async (token) => {
  return await User.findOne({ token });
};

const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

const create = async ({ name, email, password, verify, verifyToken }) => {
  const user = new User({ name, email, password, verify, verifyToken });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.findOneAndUpdate({ _id: id }, { verify, verifyToken }); // [1]
};

const updateAvatar = async (id, avatar, imgIdCloud) => {
  return await User.updateOne({ _id: id }, { avatar, imgIdCloud });
};

const verify = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = {
  findByEmail,
  findById,
  findByToken,
  create,
  updateToken,
  updateAvatar,
  verify,
  findByVerifyToken,
  updateVerifyToken,
};
