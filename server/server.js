const express = require('express');
const app = express()
const port = 8000
const http = require('http')
const Pool = require('pg').Pool
const cors = require('cors')
var bodyParser = require('body-parser')
var multer  = require('multer')
var upload = multer()
const socketIo = require("socket.io");

const pool = new Pool({
    user: 'postgres',
    host:'localhost',
    database:'postgres',
    port:5432,
    password:'router'
})
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

pool.connect ((err) => {
    if (err) {
        console.error('Unable to create database', err.stack)
    } else {
        console.log('Database connection made successfully')
    }
})

create_table_query = "CREATE TABLE IF NOT EXISTS users (id VARCHAR PRIMARY KEY NOT NULL, year SMALLINT DEFAULT '2020');"

pool.query(create_table_query, function(err, result){
    if(err){
        console.log('error: ', err)
        process.exit(1)
    }
  });
  
const getYear = () => {
    return pool.query('SELECT year FROM users WHERE id=$1 FETCH FIRST ROW ONLY', ['abc'])
   
}

const updateYear = (year) => {
    console.log("Updating year to ", year)
    return pool.query('UPDATE users SET year=$1 where id=$2', [year, 'abc'])
}

app.get('/', (req, res) => {
    getYear()
    .then(result => res.status(200).send(result.rows[0]))
    .catch(err => console.log(err))
})

app.post('/update', upload.none(), function (req, res, next) {
    updateYear(req.body.year)
    .then(result => res.status(200).send({'message': 'Succesfully updated'}))
  })

const server = http.createServer(app)

const io = socketIo(server)

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  let result
  getYear()
  .then(response => {
      return response.rows[0].year
  })
  .then(data =>  socket.emit("FromAPI", data))
};

server.listen(port, () => console.log(`Example app listening at http://127.0.0.1:${port}`))