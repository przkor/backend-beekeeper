const {uri,mongoConstructor} = require("./mongoConfig")
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
          date: date
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
  getTasks: function (username,taskID, callback) {
    const client = MongoClient(uri, mongoConstructor)
    if (taskID ===null) {
        client.connect(function (err, db) {
            const dbcon = db.db(username);
            dbcon.collection(dbCollection, function (err, collection) {
                collection.find().toArray(function (err, list) {
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
          if (err == null) {
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
