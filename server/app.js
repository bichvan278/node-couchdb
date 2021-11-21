const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const userRouter = require('./routes/api/user');
const couch = require('./db/couch');

var corsOptions = {
    origin: "http://127.0.0.1:8081"
};

const dbname = 'users';
const dbviewURL = "_design/users_view/_view/view-all";

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '../../library-vue')));
app.all(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    // res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(userRouter);

// app.get('/', (req, res) => {
//     res.send('NodeJS is working ...')
//     // res.sendFile(path + "index.html")
// })


// Read all doc in users
app.get('/users', async (req, res) => {
    await couch.get(dbname, dbviewURL).then((data, headers, status) => {
            console.log(data.data.rows)
            res.send(data)
    }, (err) => {
        res.send(err)
    })
});

// Create a new user
app.post('/user/add', (req, res) => {
    const user = couch.insert(dbname, {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        createAt: new Date()
    }).then(() => {
        res.send(user)
        console.log(user)
    })
});

// Read all doc in books
app.get('/books', (req, res) => {
    couch.get('library', '_design/books_view/_view/all_books')
    .then((data, headers, status) => {
        console.log(data.data.rows)
        res.send(data.data.rows)
    }, (err) => {
        res.send(err)
    })
});

// Add a new book
app.post('/book/add', (req, res) => {
    const user = couch.insert('library', {
        name: req.body.name,
        type: req.body.type,
        author: req.body.author,
        producer: req.body.producer,
        amount: req.body.amount,
        createAt: new Date()
    }).then(() => {
        res.send(user)
        console.log(user)
    })
});



// Login in function
// app.post('/signin', async (req, res) => {

//     await couch.get(dbname,dbviewURL,{
//             username: req.body.u_name,
//             password: req.body.p_word
//         }).then((data, headers, status) => {
            
//             // if(u_name == data.data.rows.username && p_word == data.data.rows.password) {
//             //     console.log('Login is successful!')
//             // }else {
//             //     res.send('Your account cannot find!')
//             // }
//             res.send(user)
//             console.log()
//     }, function(err){
//         res.send(err);
//     })
// });



// // HTTP server
// http.createServer(app).listen(3000, function(){
//     console.log('Connection is successful')
// });

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is working on port ' + port)
});