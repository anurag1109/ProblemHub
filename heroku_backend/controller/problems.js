const { cloudeUpload } = require("../helper/uploadFile");
const util = require("../util");

module.exports.addProblem = async (req, res) => {
  const { _id } = req.user;
  try {
    const problem = await util.model.Problems.create({
      user_id: _id,
      ...req.body,
    });
    res.status(200).send(problem);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
module.exports.updateProblem = async (req, res) => {
  try {
    const { _id, user_id } = req.body;
    if (user_id == req.user._id) {
      const { title } = await util.model.Problems.findByIdAndUpdate(_id, { ...req.body }, { new: true });
      res.status(200).send({ message: `${title} successfully updated` })
    } else {
      res.status(400).send({ message: "You are not authorize to modified this." });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }

};

module.exports.getProblem = async (req, res) => {
  try {
    const { sort = "updatedAt", by = 'desc' } = req.query;
    const { _id } = req.user;
    const problems = await util.model.Problems.find({ user_id: _id }, { answer: 0, __v: 0 })
      .populate({ path: "user_id", select: "firstName lastName" })
      .collation({ locale: "en" })
      .sort({ [sort]: [by] });
    res.status(200).send(problems);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports.getProblemById = async (req, res) => {
  try {
    const { _id } = req.params;
    const problems = await util.model.Problems.findOne({ _id });
    res.status(200).send(problems);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
module.exports.getAllProblem = async (req, res) => {
  const { sort = "updatedAt", by = 'desc', _id } = req.query;
  try {
    let query = {}
    if (!!_id) {
      query.user_id = _id
    }
    const problems = await util.model.Problems.find(query, { answer: 0, __v: 0 })
      .populate({ path: "user_id", select: "firstName lastName" })
      .collation({ locale: "en" })
      .sort({ [sort]: [by] });
    res.status(200).send(problems);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}


module.exports.addProblemTypes = async (req, res) => {
  try {
    const { title, value } = req.body;
    if (req.files && req.files.file) {
      const { secure_url } = await cloudeUpload(req)
      const problemTypes = await util.model.ProblemsTypes.create({ title, value, picture: secure_url })
      res.status(200).send(problemTypes);
    } else {
      const problemTypes = await util.model.ProblemsTypes.create(req.body);
      res.status(200).send(problemTypes);
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

module.exports.getProblemTypes = async (req, res) => {
  try {
    const problemTypes = await util.model.ProblemsTypes.find()
      .collation({ locale: "en" })
      .sort({ title: 1 });
    res.status(200).send(problemTypes);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}
module.exports.getProblemsByProblemType = async (req, res) => {
  try {
    const { _id } = req.params;
    const { search = "", sort = "updatedAt", by = 'desc', type = 'all', user_id } = req.query;
    let query = {};
    if (type === 'all') {
      query = {
        "$or": [{ question: { $regex: search, $options: "i" } },
        { answer: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } }]
      }
    } else if (type === 'user') {
      query = { user_id: user_id }
    }
    else {
      query = { "$or": [{ [type]: { $regex: search, $options: "i" } }] }
    }
    const problemTypes = await util.model.Problems.find({ type_id: _id, ...query }, { answer: 0, __v: 0 })
      .populate({ path: "user_id", select: "firstName lastName" })
      .collation({ locale: "en" })
      .sort({ [sort]: [by] });
    res.status(200).send(problemTypes);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}
module.exports.updateProblemTypes = async (req, res) => {
  try {
    const { _id } = req.params;
    if (req.files && req.files.file) {
      const { secure_url } = await cloudeUpload(req)
      const result = await util.model.ProblemsTypes.findByIdAndUpdate(_id, { picture: secure_url }, { new: true });
      res.status(200).send(result)
    } else {
      const result = await util.model.ProblemsTypes.findByIdAndUpdate(_id, { ...req.body }, { new: true });
      res.status(200).send(result)
    }

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

module.exports.problemSearch = async (req, res) => {
  try {
    const { search, id, sort = "updatedAt", by = 'desc', type = 'all' } = req.query;
    let query = {}
    if (!!id && type === 'all') {
      query = {
        "user_id": id, "$or": [{ question: { $regex: search, $options: "i" } },
        { answer: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } }]
      }
    } else if (!!id) {
      query = { "user_id": id, "$or": [{ [type]: { $regex: search, $options: "i" } }] }
    }
    else if (type === 'all') {
      query = {
        "$or": [{ question: { $regex: search, $options: "i" } },
        { answer: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } }]
      }
    } else {
      query = { "$or": [{ [type]: { $regex: search, $options: "i" } }] }
    }
    const result = await util.model.Problems.find(query)
      .populate({ path: "user_id", select: "firstName lastName" })
      .collation({ locale: "en" })
      .sort({ [sort]: [by] });
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}
