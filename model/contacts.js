const Contact = require("./schema/contact");

const getAll = async (
  userId,
  { sortBy, sortByDesc, filter, limit = 5, offset = 0 }
) => {
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? filter.split("|").join(" ") : "",
      populate: {
        path: "owner",
        select: "name, email -_id",
      },
    }
  );

  const { docs: contacts, totalDocs: total } = results;
  return { limit, offset, contacts, total };
};

const getById = async (contactId, userId) =>
  await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name, email _id",
  });

const add = async (contactObj) => await Contact.create(contactObj);

const remove = async (id) => await Contact.findByIdAndRemove({ _id: id });

const update = async (id, contactObj, userId) => {
  return await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...contactObj },
    { new: true }
  );
};

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
};
