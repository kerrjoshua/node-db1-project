const router = require('express').Router()
const Account = require('./accounts-model')
const { 
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique  
} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Account.getAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  Account.getById(req.params.id)
    .then(account => {
      res.json(account)
    })
      .catch(next)
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status( err.status || 500)
    .json( {
      message: err.message,
      customMessage: 'Something went wrong in the accounts router.'
    })
})

module.exports = router;
