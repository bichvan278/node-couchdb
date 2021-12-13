const express = require('express')
const couch = require('./../../db/couch')
const dbname = 'users';
const dbviewURL = "_design/users_view/_view/view-all";
const db = couch.use('users')

const router = express.Router();

// router.get('/test', async (req, res) => {
//     try {
//         const login = [doc.username, doc.password]
//         const test = await db.fetch({keys: login})
//         res.send(test)
//     } catch (e) {
//         console.error(e)
//     }
// })


// Read all doc in users
router.get('/users', async (req, res) => {
    
    try {
        const userList = await db.list({include_docs: true})

        console.log(userList)
        res.send(userList.rows)
    } catch (error) {
        console.error(error)
    }
});

// Read detail user
router.get('/user/:id', async (req, res) => {
    const id = req.params.id
    try {
        const userid = await db.get(id)
        if(!userid) {
            res.status(404).send()
        }
        res.status(200).send(userid)
    } catch (error) {
        console.error(error)
    }
});

// Create a new user (SIGN UP)
router.post('/register', async (req, res) => {
    try {
        const user = {
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            username: req.body.username,
            password: req.body.password,
            createAt: new Date()
        }
        await db.insert(user)
        res.status(201).send(user)
    } catch (error) {
        console.error(error)
    }
});

// Sign In
router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        // if(username === 'lanpui' && password === 'lanpuibanhwet') {
        //     res.status(200).send('Admin is login succesful!')
        // }else if(username === 'lienlien' && password === 'lien123'){
        //     res.status(200).send('Librarian is login succesful!')
        // }else if(username === 'henry' && password === 'henry123'){
        //     res.status(200).send('Reader is login succesful!')
        // }else {
        //     res.send('ACC is not available!')
        // }

        const find_user = {
            selector : {
                username: username,
                password: password
            },
            fields: [ "_id", "fullname", "email", "phone", "email", "username", "password", "role" ]
        }
        const userid = await db.find(find_user)
        // console.log(get)
        if(username === username && password === password) {
            res.status(200).send(userid)
        }
        else{
            res.status(500).send("Try again!")
        }
    }catch (e) {
        console.log(e)
    }
});

// Read all doc in users
// router.get('/users', async (req, res) => {
//     await couch.get(dbname, dbviewURL).then((data, headers, status) => {
//             console.log(data.data.rows)
//             res.send(data.data.rows)
//     }, (err) => {
//         res.send(err)
//     })  
// });

module.exports = router;