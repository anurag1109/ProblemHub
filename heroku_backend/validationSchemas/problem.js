const yup = require('yup');

module.exports.AddProblemSchema=yup.object().shape({
    title:yup.string().required("Title required"),
    type_id:yup.string().required("type_id required"),
    question:yup.string(),
    answer:yup.string(),
  })

  module.exports.UpdateProblemSchema=yup.object().shape({
      _id:yup.string().required("id required"),
      user_id:yup.string().required("user_id required"),
      title:yup.string().required("Title required"),
      type_id:yup.string().required("type_id required"),
      question:yup.string(),
      answer:yup.string(),
    })  