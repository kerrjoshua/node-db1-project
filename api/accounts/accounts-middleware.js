const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name || typeof name !== 'string' || !name.trim().length) {
    next({status:422, message: 'Please provide a name for your account.'})
  }
  
  else if (budget === undefined || typeof budget !== 'number') {
    next({status:422, message: 'Accounts need a budget which must be a number type.'})
  } else{
  next()
  }

}

exports.checkAccountNameUnique = async (req, res, next) => {
  const name = req.body.name.trim();
  
  try{
    const accounts = await Account.getAll()
    const matched = accounts.filter(account => account.name === name);
    if (matched.length) { 
      next({status:422, message: 'Account name in use: Please try again with a different account name.'})
    } else {next()}} catch(err){
      next(err)
    }
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
