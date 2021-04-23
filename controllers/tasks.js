const tasks = require("../database/tasks");
const {checkIsLogged} = require('./checkIsLogged')

exports.getTasks = (req, res, next) => {
  try {
    username = req.session.username;
    let taskID = null
    if (!checkIsLogged(username)) {res.send('access denied') ;return}
    if (req.query.taskID) { taskID = req.query.taskID }
    tasks.getTasks(username,taskID, function (result) {
        res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Błąd! Coś poszło nie tak, przy metodzie GET w endpointcie /tasks',
    });
    console.log(error)
  }
};

exports.addTask = (req,res,next) => {
    try {
        username = req.session.username;
        if (!checkIsLogged(username)) {res.send('access denied') ;return}
        const id = req.body.id;
        const title = req.body.title;
        const subject = req.body.subject;
        if (id === "" || id === undefined) {
           tasks.addTask(username, title, subject, function (result) {
             res.status(201).send(result);
            });
        } else {
              tasks.updateTask(username, id, title, subject, function (result) {
                res.send(result);
              });
        }

    } catch(error) {
        res.status(500).json({
            error,
            message: 'Błąd! Coś poszło nie tak, przy metodzie POST w endpointcie /tasks',
          });
          console.log(error)

    }
}

exports.updateTask = (req,res,next) => {
    try {
        username = req.session.username;
        if (!checkIsLogged(username)) {res.send('access denied') ;return}
        const id = req.body.id;
        tasks.getTaskWithId(username, id, function (result) {
          res.status(202).send(result);
        });

    } catch(error) {
        res.status(500).json({
            error,
            message: 'Błąd! Coś poszło nie tak, przy metodzie PUT w endpointcie /tasks',
          });
          console.log(error)

    }
}

exports.deleteTask = (req,res,next) => {
    try {
        username = req.session.username;
         if (!checkIsLogged(username)) {res.send('access denied') ;return}
        const id = req.query.id;
        tasks.deleteTask(username, id, function (result) {
          res.send(result);
        });
    } catch(error) {
        res.status(500).json({
            error,
            message: 'Błąd! Coś poszło nie tak, przy metodzie DELETE w endpointcie /tasks',
          });
          console.log(error)

    }
}
