const {uri,mongoConstructor} = require("./mongoConfig")
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
dbcollection = 'U'
module.exports = {

  getInspection: function (username,hiveID,callback) {
    const dbCollection = dbcollection.concat(hiveID)
   // const query = { isActive:true , hiveID:hiveID}
    const client =  MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      if (err) {console.warn('Błąd połączenia z bazą danych'); return}
      const dbcon = db.db(username);
      dbcon.collection(dbCollection, function (err, collection) {
        if (err) {console.warn(`Błąd połączenia z bazą`)}
        else {
          collection.find().toArray(function (err, result) {
            client.close();
            if (err===null)
            {
              if (result!==undefined) {callback(result);}
              else {callback(false)} 
            }
            else {callback(false)}
          });
        } 
      });
    });
  },

  addInspection: function (username,data, callback) {
    const {hiveID,ins_data,ins_type1,ins_type2,description} = data
    const dbCollection = dbcollection.concat(hiveID)
    const client = MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(dbCollection).insertOne(
        {
          ins_data: ins_data,
          ins_type1: ins_type1,
          ins_type2: ins_type2,
          description: description
        },
        function (err, result) {
          client.close();
          const insertedCount = result.insertedCount
          const insertedId = result.insertedId
          //const Data = {_id:insertedId, line,delivery}
          if (err == null) {
            callback({insertedCount});
          } else {
            callback({insertedCount});
          }
        }
      );
    });
  },
  
};

 