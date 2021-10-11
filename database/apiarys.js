const {uri,mongoConstructor} = require("./mongoconfig")
let MongoClient = require("mongodb").MongoClient;
let mongodb = require("mongodb");
const dbCollection = 'apiary'

module.exports = {

    getApiarys: function (username, callback) {
        const client =  MongoClient(uri,mongoConstructor)
        client.connect(function (err, db) {
          const dbcon = db.db(username);
          dbcon.collection(dbCollection, function (err, collection) {
            collection.find().toArray(function (err, list) {
              if (err===null)
              {
                client.close();
                callback(list);
              }
              else {callback(false)}
            });
          });
        });
      },

addApiary: function (username,data, callback) {
  const {name,location} = data
  const client =  MongoClient(uri,mongoConstructor)
  client.connect(function (err, db) {
    const dbcon = db.db(username);
    dbcon.collection(dbCollection).insertOne(
      {
        name: name,
        location: location,
      },
      function (err, result) {
        client.close();
        const insertedCount = result.insertedCount
        const insertedId = result.insertedId
        if (err === null) {
          callback({insertedCount,insertedId});
        } else {
          callback({insertedCount});
        }
      }
    );
  });
},

updateApiary: function (username,data,callback) {
  const {_id,name,location} = data
  const client =  MongoClient(uri,mongoConstructor)
  client.connect(function (err, db) {
   const dbcon = db.db(username);
    dbcon
      .collection(dbCollection)
      .updateOne(
        { _id: mongodb.ObjectID(_id) },
        { $set: { name: name, location:location } },
        function (err, result) {
          client.close()
          if (err == null) {
            callback(true);
          } else {
            callback(false);
          }
        }
      );
  });
},

deleteApiary: function (username, id, callback) {
  const client =  MongoClient(uri,mongoConstructor)
  console.log(`Jestem w deleteApiary a id = ${id}`)
  client.connect(function (err, db) {
    const dbcon = db.db(username);
    const query = {apiary:id,isActive:true}
    /*
    Sprawdzenie czy są przypsiane ule do danej pasieki. Jeśli tak to nie można usunąć pasieki
    bez wcześniejszego przeniesienia uli do innych pasiek (np. migracja lub całkowite usunięcie)
    */
    dbcon.collection("hives").countDocuments(query,function (err, result) {
      if (err === null) {
        if (parseInt(result)===0) {
        dbcon.collection(dbCollection).deleteOne(
          {
            _id: new mongodb.ObjectID(id),
          },
          function (err, result) {
            const count = result.deletedCount
            client.close();
            if (err === null) {
              callback({ack:true, deletedNumber:count});
            } else {
              callback(false);
            }
          }
        );
      } else {
        client.close();
        callback({ack:true, deletedNumber:0});
      }
    }
    else {
      client.close();
      callback(false);
    }
  })
})
},

}

  