const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

const usersRoutes = require('./routes/users');
const tasksRoutes = require('./routes/tasks');
const hivesRoutes = require('./routes/hives');
const inspectionRoutes = require('./routes/inspection');
const apiarysRoutes = require('./routes/apiarys');
const quensRoutes = require('./routes/quens');
const logoutRoutes = require('./routes/logout');

const server = express();

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, "../beekeeper/public")));
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

//let username;


server.use('/user', usersRoutes);
server.use('/tasks', tasksRoutes);
server.use('/hives', hivesRoutes);
server.use('/inspection', inspectionRoutes);
server.use('/apiarys', apiarysRoutes);
server.use('/quens', quensRoutes);
server.use('/logout', logoutRoutes);

server.listen(7777, () => console.log('Server for Beekeeper is started...'));
