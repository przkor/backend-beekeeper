const express = require('express');
const session = require("express-session");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const Promise = require ('bluebird').Promise;

const {uri,mongoConstructor} = require("./database/mongoconfig")
const server = express();

const usersRoutes = require('./routes/users');
const tasksRoutes = require('./routes/tasks');
const hivesRoutes = require('./routes/hives');
const inspectionRoutes = require('./routes/inspection');
const apiarysRoutes = require('./routes/apiarys');
const quensRoutes = require('./routes/quens');
const logoutRoutes = require('./routes/logout');

let database

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'build')));

server.use(cors());
server.use(session({ 
    secret: "ErbY78P16Jk" ,
    saveUninitialized: false ,
    resave:true,
    cookie : {
      maxAge: 6000000,
      sameSite: 'strict', 
    }
  }));

  MongoClient.connect(uri,mongoConstructor, (err, db) => {
    if (err) {
      console.warn(`Failed to connect to the database. ${err.stack}`);  
      return
    }
    //server.locals.db = db
   database=db
    server.listen(7777, () => {
      console.info(`Server.js app is listening at http://localhost:7777}`);
    });
  });
  
/*
  server.get('/user/signin', async (req, res, next) => {
    try {
      const db = server.locals.db.db('users');
      console.log(db)
      const login = req.query.login
      const password = req.query.password
      //console.log('baza',db)
      const user = await db.collection('users').findOne({ 
        login: login,
        password: password,
        active: 1 
      });
  
      if (user) {
        console.log('user:', user)
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  });
  */
 
  // Make our db accessible to our router
  server.use(function(req, res, next){
    req.db = database;
    next();
  });

server.use('/user', usersRoutes);
server.use('/tasks', tasksRoutes);
server.use('/hives', hivesRoutes);
server.use('/inspection', inspectionRoutes);
server.use('/apiarys', apiarysRoutes);
server.use('/quens', quensRoutes);
server.use('/logout', logoutRoutes);

/*
MongoClient.connect(uri)
  .catch(err => console.error(err.stack))
  .then(db => {
    server.locals.db = db;
    server.listen(port, () => {
      console.log(`Server.js app is listening at http://localhost:${port}`);
    });
  });
  */






//server.listen(7777, () => console.log('Server for Beekeeper is started...'));
