const express = require('express')
const couch = require('./../../db/couch')
const dbname = 'users';
const dbviewURL = "_design/users_view/_view/view-all";

const router = express.Router();

router.get('/', async (req, res) => {
    // res.send('Connection is successful!')
    await couch.get(dbname).then((data, headers, status) => {
        const givedata = data.data.rows
        // console.log(givedata)
        // console.log(data.data.rows)
        res.send(givedata)
    }, (err) => {
        res.send(err)
    })  
});

// Create a new user (SIGN UP)
router.post('/register', async (req, res) => {
    const user = await couch.insert(dbname, {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        createAt: new Date()
    }).then(() => {
        res.send(user)
        console.log(user)
    })
});

// Sign In
router.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if(username === 'lanpui' && password === 'lanpuibanhwet') {
            res.status(200).send('Admin is login succesful!')
        }else if(username === 'lienlien' && password === 'lien123'){
            res.status(200).send('Librarian is login succesful!')
        }else if(username === 'henry' && password === 'henry123'){
            res.status(200).send('Reader is login succesful!')
        }else {
            res.send('ACC is not available!')
        }
    }catch (e) {
        console.log(e)
    }

    // const queryUser = {
    //     username,
    //     password
    // }

    // await couch.get(dbname, dbviewURL, queryUser).then((data, headers, status) => {
    //         res.send(data)
    //         console.log('Login successful!')
    // }, (err) => {
    //     res.send(err)
    // })
});

// Read all doc in users
router.get('/users', async (req, res) => {
    await couch.get(dbname, dbviewURL).then((data, headers, status) => {
            console.log(data.data.rows)
            res.send(data.data.rows)
    }, (err) => {
        res.send(err)
    })
});

module.exports = router;