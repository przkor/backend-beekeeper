const {uri,mongoConstructor} = require("./mongoConfig")
//import {uri,mongoConstructor} from './mongoConfig' 
let MongoClient = require("mongodb").MongoClient;
const collectionName = "user"


module.exports = {
  signup: function (login, name, email, password, callback) {
    //const textToSplit = email.split("@");
    //const dbName = textToSplit[0];
    const dbName = login
    const client = new MongoClient(uri, mongoConstructor);
    client.connect(err => {
      client.db(dbName).collection(collectionName).insertOne(
        {
          login: login,
          name:name,
          email: email,
          password: password,
        },
        function (err, result) {
          client.close();
          if ((result.insertedCount === 0) || (result === undefined)) {
            console.log("Nie dodano użytkownika. ",err);
            callback(false);
            
          } else {
            console.log("Dodano użytkownika");
            callback(true);
          }
        }
      );    
    });

  
   /*
    MongoClient.connect(url,function (err, db) {
      const textToSplit = email.split("@");
      const dbName = textToSplit[0];
      const dbcon = db.db(dbName);
      dbcon.collection(datacollection).insertOne(
        {
          name: name,
          email: email,
          password: password,
        },
        function (err, result) {
          console.log("Saved the user sign up details.");
          if (result == null) {
            console.log("Nie dodano użytkownika");
            callback(false);
          } else {
            console.log("Dodano użytkownika");
            callback(true);
          }
        }
      );
    });
    */
  },

  validateSignIn: function (login, password, callback) {
    const dbName = login
    //{ useNewUrlParser: true, useUnifiedTopology: true }
    const client = new MongoClient(uri, mongoConstructor );
    client.connect(err => {
      client.db(dbName).collection(collectionName).findOne(
        {
          login: login,
          password: password,
        },
        function (err, result) {
          client.close();
          if (result === null) {
            console.log("Niezalogowano",err);
            callback(false);
          } else {
            console.log("Zalogowano poprawnie");
            callback(true);
          }
        }
      );    
    });
    /*
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      console.log(`Połączono z bazą`)
      client.db("wiesiek").collection("user").findOne({ email: username, password: password }, function (
        err,
        result
      ) {
        if (result === null) {
          console.log("returning false");
          callback(false);
          client.close();
        } else {
          console.log("returning true");
          callback(true);
          client.close();
        }
      })
      // perform actions on the collection object
      
    });
    */
    
    /*
    MongoClient.connect(uri, function (err, db) {
      const dbName = login
      const dbcon = db.db(dbName);
      dbcon
        .collection(collectionName)
        .findOne({ login: login, password: password }, function (
          err,
          result
        ) {
          if (result === null) {
            console.log("Błąd. Nie zalogowano",result);
            callback(false);
          } else {
            console.log("Zalogowano poprawnie");
            callback(true);
          }
        });
    });
    */
  },
};
