const fs = require("fs").promises;
const { uploadCloud } = require("./cloudinary");
const cloudinary = require("cloudinary").v2;

module.exports.saveAvatarToCloud = async (req) => {
  const pathFile = req.file.path;
  const result = await uploadCloud(pathFile, {
    folder: "Photo",
    transformation: { width: 300, height: 300, crop: "fill" },
  });

  cloudinary.uploader.destroy(req.user.imgIdCloud, (err, result) => {
    console.log(err, result);
  });
  try {
    await fs.unlink(pathFile);
  } catch (e) {
    console.log(e);
  }
  return result;
};
