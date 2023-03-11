const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  let {  name, budget } = req.body;
  if (name) {
  name = name.trim();
  req.body.name = name;
  }
  
  if (name === undefined || budget === undefined) {
    next({status:400, message: 'name and budget are required'})
  }
  else if (name.length < 3 || name.length > 100) {
    next({status: 400, message: 'name of account must be between 3 and 100'})
  }
  
  else if (!Number(budget)) {
    next({status:400, message: 'budget of account must be a number'})
  } 
  else if (budget < 0 || budget > 1000000) {
    next({ status: 400, message: 'budget of account is too large or too small'})
  }
  else{
  next()
  }

}

exports.checkAccountNameUnique = async (req, res, next) => {
  const name = req.body.name;
  
  try{
    const accounts = await Account.getAll()
    const matched = accounts.filter(account => account.name === name);
    if (matched.length) { 
      next({status:400, message: 'that name is taken'})
    } else {next()}} catch(err){
      next(err)
    }
}

exports.checkAccountId = (req, res, next) => {
  Account.getById(req.params.id)
    .then(account => {
      if (!account) {
        next({status: 404, message: `account not found`})
      } else {next()}
    })
      .catch(next)
}
