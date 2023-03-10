const router = require('express').Router()
const Account = require('./accounts-model')

router.get('/', (req, res, next) => {
  Account.getAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
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
