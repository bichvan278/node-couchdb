const express = require('express');
const nano = require('nano');
const couch = require('./../../db/couch')
const db = couch.use('library')

const router = express.Router();

// Read all doc in users with view
router.get('/booklist', async(req, res) => {

    try {
        // const boolList = await db.list({include_docs: true})

        const booklist = await db.view('books_view', 'all_books')

        console.log(booklist)
        res.send(booklist.rows)
    } catch (error) {
        console.error(error)
    }
});

// Read detail book
router.get('/book/:id', async(req, res) => {
    const id = req.params.id
    try {
        const findid = {
            selector: {
                _id: id
            },
            fields: ["name", "type", "author", "amount", "producer"]
        }
        const bookid = await db.find(findid)
        res.status(200).send(bookid)
    } catch (error) {
        console.error(error)
    }
});

// Create a new book 
router.post('/books/addBook', async(req, res) => {
    try {
        const book = {
            name: req.body.name,
            type: req.body.type,
            author: req.body.author,
            producer: req.body.producer,
            amount: req.body.amount,
            createAt: new Date()
        }
        await db.insert(book)
        res.status(201).send(book)
    } catch (error) {
        console.error(error)
    }
});

// Create a new book 
router.post('/book/edit/', async(req, res) => {
    const id = req.params.id
    try {
        const getRev = doc._rev
        const rev = await db.get({ _rev: getRev })
        res.send(rev.docs)
            // const book = {
            //     name: req.body.name,
            //     type: req.body.type,
            //     author: req.body.author,
            //     producer: req.body.producer,
            //     amount: req.body.amount,
            //     updateAt: new Date()
            // }
            // await db.insert(book)
            // res.status(201).send(book)
    } catch (error) {
        console.error(error)
    }
});
// command test git

module.exports = router;