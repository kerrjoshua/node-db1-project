const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  Account.getById(req.params.id)
    .then(account => {
      if (!account) {
        next({status: 404, message: `There is no account with ID ${req.params.id}`})
      } else {next()}
    })
      .catch(next)
}
