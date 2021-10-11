const {uri,mongoConstructor} = require("./mongoconfig")
let MongoClient = require("mongodb").MongoClient;
let mongodb = require("mongodb");
const dbCollection = 'tasks'

module.exports = {

  addTask: function (username, title, subject, apiary,date, callback) {
    const client = MongoClient(uri, mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(dbCollection).insertOne(
        {
          title: title,
          subject: subject,
          apiary: apiary,
          date: date,
          finishDate:'',
          status:1
        },
        function (err, result) {
          client.close();
          if (err == null) {
            callback(true);
          } else {
            callback(false);
          }
        }
      );
    });
  },

  finishTask: function (username, id, callback) {
    const client = MongoClient(uri, mongoConstructor)
    const today = new Date().toISOString().slice(0,10)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon
        .collection(dbCollection)
        .updateOne(
          { _id: new mongodb.ObjectID(id) },
          { $set: { status: 0, finishDate:today } },
          function (err, result) {
            client.close();
            if (err == null) {
              callback(true);
            } else {
              callback(false);
            }
          }
        );
    });
  },

  updateTask: function (username, id, title, subject, apiary,date, callback) {
    const client = MongoClient(uri, mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon
        .collection(dbCollection)
        .updateOne(
          { _id: new mongodb.ObjectID(id) },
          { $set: { title: title, subject: subject, apiary:apiary , date:date } },
          function (err, result) {
            client.close();
            if (err == null) {
              callback(true);
            } else {
              callback(false);
            }
          }
        );
    });
  },
  
  getTasks: function (username,taskID,status, callback) {
    const client = MongoClient(uri, mongoConstructor)
    let query
    let options
    if (parseInt(status)===1) {query = {status:1} ; options = {date:1}}
    else {query = {status:0} ; options = {finishDate:-1}}
  
    if (taskID ===null) {
        client.connect(function (err, db) {
            const dbcon = db.db(username);
            dbcon.collection(dbCollection, function (err, collection) {
                collection.find(query).sort(options).toArray(function (err, list) {
                    client.close();
                    callback(list);
                });
            });
        });
    }
    else {
        client.connect(function (err, db) {
            const dbcon = db.db(username);
            dbcon.collection(dbCollection).findOne(
              {
                _id: new mongodb.ObjectID(taskID),
              },
              function (err, result) {
                client.close();
                if (err == null) {
                  callback(result);
                } else {
                  callback(false);
                }
              }
            );
        });
    } 
  },

  getHistorycalTasks: function (username, callback) {
    const client = MongoClient(uri, mongoConstructor)
    query = {status:0}
        client.connect(function (err, db) {
            const dbcon = db.db(username);
            dbcon.collection(dbCollection, function (err, collection) {
                collection.find(query).sort({date:1}).toArray(function (err, list) {
                    client.close();
                    callback(list);
                });
            });
        });
  },

  deleteTask: function (username, id, callback) {
    const client = MongoClient(uri, mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(dbCollection).deleteOne(
        {
          _id: new mongodb.ObjectID(id),
        },
        function (err, result) {
          client.close();
          if (err === null) {
            callback(true);
          } else {
            callback(false);
          }
        }
      );
    });
  },

  getProfile: function (username, session_email, callback) {
    const client = MongoClient(uri, mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection("user").findOne(
        {
          email: session_email,
        },
        function (err, result) {
          client.close();
          if (err == null) {
            callback(result);
          } else {
            callback(false);
          }
        }
      );
    });
  },
};
