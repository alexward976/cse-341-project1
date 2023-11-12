const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    })
}

const getById = async (req, res) => {
    const contactId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    })
}

const addContact = async (req, res) => {
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }

    mongodb.getDatabase().db().collection('contacts').insertOne(newContact).then((result) => {
        res.json(result);
    })
}

const updateContact = async (req, res) => {
    const contactId = { _id: new ObjectId(req.params.id) }
    const newValues = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }
    }

    mongodb.getDatabase().db().collection('contacts').updateOne(contactId, newValues).then((result) => {
        res.json(result);
    })
}

const deleteContact = async (req, res) => {
    const contactId = { _id: new ObjectId(req.params.id) }

    mongodb.getDatabase().db().collection('contacts').deleteOne(contactId).then((result) => {
        res.json(result);
    })
}

module.exports = {
    getAll,
    getById,
    addContact,
    updateContact,
    deleteContact
}