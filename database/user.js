const {uri,mongoConstructor} = require("./mongoconfig")
//import {uri,mongoConstructor} from './mongoConfig' 
const MongoClient = require("mongodb").MongoClient;
const collectionName = "user"


module.exports = {
  signup: async function (login, name, email, password, callback) { 
    const client = new MongoClient(uri, mongoConstructor );
    try {
      await client.connect()
      let database = client.db('users');
      let collection = database.collection('users');
      let query = { login: login };
      let result = await collection.findOne(query);
      console.log(result)
      if (result!==null) { 
        callback(false)
      }
      else {   
        result = await collection.insertOne({
          login:login,
          name:name,
          email:email,
          password:password,
          active:0
        })
        if (result.insertedCount===1) { 
          callback(true)
        }
        else {callback(false)}
      }
        /*
        database = await client.db(login);
        collection = await database.collection('user');
        query = { login: login , name:name, email:email, password:password };
        result = await collection.insertOne(query);
        if (result.insertedCount===1) { 
          callback(true)
        }
        else {callback(false)}
      }
      */
   }  catch (error) {
        console.error(error);
   } finally {
     client.close()
   }




    /*
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
*/
  
  },

  validateSignIn: async function (login, password, db,callback) {
    try {
      db.db('users').collection('users').findOne(
        {
          login: login,
          password: password,
          active:1
        },
        function (err, result) {
         // client.close();
          if (result === null) {
            console.log("Niezalogowano");
            callback(false);
          } else {
            console.log("Zalogowano poprawnie");
            callback(true);
          }
          if (err) console.log("błąd: ", err)
        }
      );
    }
    catch (error) {
      console.error(error);
 } finally {
   
 }


        
    /*
    const client = new MongoClient(uri, mongoConstructor );
    client.connect(err => {
      client.db('users').collection('users').findOne(
        {
          login: login,
          password: password,
          active:1
        },
        function (err, result) {
          client.close();
          if (result === null) {
            console.log("Niezalogowano");
            callback(false);
          } else {
            console.log("Zalogowano poprawnie");
            callback(true);
          }
          if (err) console.log("błąd: ", err)
        }
      );    
    });
    */

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
