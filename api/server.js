const express = require("express");
const accountRoutes = require('./accounts/accounts-router')

const server = express();

server.use(express.json());
server.use('/api/accounts', accountRoutes);

server.use('*', (req, res) => {
    res.status(400).json({ message: 'That endpoint doesn\'t seem to exist'})
})

module.exports = server;
