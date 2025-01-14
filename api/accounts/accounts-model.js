const db = require('../../data/db-config')

const getAll = async () => {
  const result = await db('accounts')
  return result
}

const getById = async id => {
  const result = await db('accounts').where('id', id).first();
  return result
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
  account.id = id
  return account;
}

const updateById = async (id, account) => {
 await db('accounts').where('id', id).update(account)
 const result = await getById(id);
 return result;
}

const deleteById = async id => {
  const toDelete = getById(id);
  try {
    await db('accounts').where('id', id).del()
    return toDelete
  } catch (err) { return err }

}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
