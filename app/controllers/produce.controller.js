const produceService = require('../services/produce.service')
const apiPrefix = '/api/notes'
const helpers = require('../helpers/helpers')

module.exports = {
    readAll: _readAll,
    create: _create,
    delete: _delete,
    update: _update
}

function _readAll(req, res) {
    produceService.readAll()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
}

function _create(req, res) {
        helpers.attachEmoji(req.body.listItem)
            .then((data) => {
                req.body.emoji = data
                produceService.create(req.body)
                    .then((id) => {
                        res.status(201)
                            .location(`${apiPrefix}/${id}`)
                            .json(id)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).send(err)
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send(err)
            })
}

function _delete(req, res) {
    produceService
        .delete(req.params.id)
        .then((data) => {
            res.status(200)
            .json(data)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send(err)
        })
}

function _update(req, res) {
    helpers.attachEmoji(req.body.listItem)
        .then((data) => {
            req.body.emoji = data
            produceService.update(req.params.id, req.body)
                .then((data) => {
                    res.status(200)
                    .json(data)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).send(err)
                })
        })
}