const {uri,mongoConstructor} = require("./mongoconfig")
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const dbcollection = 'hives' 

module.exports = {

  getInspection: function (username,hiveID,callback) {
    const query = { isActive:true , number:parseInt(hiveID)}
    const options = {
      projection: { _id: 0, inspection: 1 },
    };
    const client =  MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      if (err) {console.warn('Błąd połączenia z bazą danych'); return}
      const dbcon = db.db(username);
      dbcon.collection(dbcollection, function (err, res) {
        if (err) {console.warn(`Błąd połączenia z bazą`)}
        else {
          res.find(query,options).toArray(function (err, result) {
            console.log(result[0].inspection)
            client.close();
            if (err===null)
            {
              if (result!==undefined) {callback(result[0].inspection);}
              else {callback(false)} 
            }
            else {callback(false)}
          });
        } 
      });
    });
    /*
    try {
      await client.connect();
      const database = client.db(username);
      const collection = database.collection(dbCollection);
      const query = { isActive:true , number: hiveID};
      const options = {
        projection: { _id: 0, inspection: 1 },
      };
      const rel=await collection.find(query).toArray()
      console.log(rel)
      await client.close();
    }
    catch (e) {
      console.error(e);
    } 
    */
  },

    /*
    const query = { isActive:true , number: hiveID}
    const options = {_id:0,inspection: 1};
    
    client.connect(function (err, db) {
      if (err) {console.warn('Błąd połączenia z bazą danych'); return}
      const dbcon = db.db(username);
      dbcon.collection(dbCollection, function (err, collection) {
        if (err) {console.warn(`Błąd połączenia z bazą`)}
        else {
          collection.find(query,options).toArray(function (err, result) {
            console.log(result.lenght)
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
  */
 
    /*
    let query
    query = { isActive:true , number: hiveID}
    let options
    options = {
      inspection: 1
    };
    const client =  MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      if (err) {console.warn('Błąd połączenia z bazą danych'); return}
      const dbcon = db.db(username);
      dbcon.collection(dbCollection, function (err, collection) {
        if (err) {console.warn(`Błąd! Nie znaleziono kolekcji`)}
        else {
          collection.find(
            query,options)
            .toArray(function (err, result) {
            client.close();
            if (err===null)
            {
              if (result!==undefined) {callback(result);console.log(result)}
              else {callback(false)} 
            }
            else {callback(false)}
          });
        } 
      });
    });
  },
  */


  addInspection: function (username,data, callback) {
    const {hiveID,_id,ins_data,ins_type1,ins_type2,description} = data
    const query = { isActive:true , number: hiveID}
    const client = MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      const dbcon = db.db(username);
      dbcon.collection(dbcollection).updateOne(query,
        {$push:{
          inspection:{
            _id:_id,
            ins_data: ins_data,
            ins_type1: ins_type1,
            ins_type2: ins_type2,
            description: description
          }       
      }},
        function (err, result) {
          client.close();
          const insertedCount = result.insertedCount
          const insertedId = result.insertedId
          //const Data = {_id:insertedId, line,delivery}
          if (err === null) {
            callback({insertedCount});
          } else {
            callback({insertedCount});
          }
        }
      );
    });
  },
  
};

 