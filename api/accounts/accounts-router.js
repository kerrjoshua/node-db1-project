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

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
 
  Account.create(req.body)
    .then(createdAccount => {
      res.status(201).json(createdAccount)
    })
    .catch(next)
})

router.put('/:id', checkAccountId,checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Account.updateById(req.params.id, req.body)
    .then(updated => {
      res.json(updated)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Account.deleteById(req.params.id)
    .then(deleted => {
      res.json(deleted)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status( err.status || 500)
    .json( {
      stack: err.stack,
      message: err.message,
      customMessage: 'Something went wrong in the accounts router.'
    })
})

module.exports = router;
