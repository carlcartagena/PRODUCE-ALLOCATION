const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: _readAll,
    create: _create,
    delete: _delete,
    update: _update
}

function _readAll() {
    return conn.db().collection('produce')
        .find()
        .sort({
            _id: -1
        })
        .map((data) => {
            data._id = data._id.toString()
            return data
        })
        .toArray()
}

function _create(body) {
    let dateIso = new Date()

    body.createDate = dateIso
    body.updateDate = dateIso

    return conn.db().collection('produce').insertOne(body)
        .then((result) => {
            result.insertedId.toString()
        })
}

function _delete(id) {
    return conn.db().collection('produce').deleteOne({ "_id": ObjectId(id) })
        .then((result) => {
            Promise.resolve()
        })
}

function _update(id, body) {
    let dateIso = new Date()
    body.updateDate = dateIso

    return conn.db().collection('produce').update({
        _id: new ObjectId(id)
    }, {
            $set: {
                listItem: body.listItem,
                updateDate: body.updateDate,
                checkBox: body.checkBox,
                emoji: body.emoji
            }
        })
        .then((result) => {
            Promise.resolve()
        })
}