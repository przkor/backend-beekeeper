const {uri,mongoConstructor} = require("./mongoConfig")
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const dbcollection = 'hives'

module.exports = {

  getFreeHiveNumber: function (username, callback) {
    const query = { isActive: false};
    const options = {
      // sort matched documents in descending order by rating
      //sort: { rating: -1 },
      projection: { number: 1},
    };
    MongoClient.connect(uri, mongoConstructor, async function (err, db) {
      if (err) {console.log('błąd połączenia z bazą')}
      else {
        const dbcon = db.db(username);
        const count = await dbcon.collection(dbcollection).estimatedDocumentCount()+1
        dbcon.collection(dbcollection).findOne(query,options
          ,
          function (err, result) {
            if (err === null) {
                if (result) { callback({number:result.number, count:count});}
                else { callback({number:false, count:count}); }
              }
            else {
              callback(false);
            }
          }
        );
      }
    });
  },

  getHivesAmountInApiary: async function (username,id, callback) {   

    try {
      const client =  new MongoClient(uri,mongoConstructor)
      let query = {
        apiary:id,
        isActive:true
      }
      if (id ==='all') {
        query = {
          isActive:true
        }
      }
      await client.connect(function (err, db) {
        if (err) {console.log(`błąd połączenia z bazą`)}
        else {
          const dbcon = db.db(username);
          dbcon.collection(dbcollection, function (err, collection) {
            if (err) {console.warn(`błąd przy połączeniu z kolekcją danych`)}
            else {
              collection.countDocuments(query,function (err, result) {
                client.close();
                if (err === null) {callback({result})}
                else { callback(false) };
              }
           )}        
          } 
        )};
        }) 
      } catch (e) {
        console.error(e);
      } 
  },

  getHives: function (username,apiaryID,callback) {
    let query
    if(apiaryID==='all') { query = { isActive:true}}
    else { query = { isActive:true , apiary:apiaryID}}
    const client =  MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      if (err) {console.warn('Błąd połączenia z bazą danych'); return}
      const dbcon = db.db(username);
      dbcon.collection(dbcollection, function (err, collection) {
        if (err) {console.warn(`Błąd połączenia z bazą`)}
        else {
          collection.find(query).toArray(function (err, result) {
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

  updateHive: function (username,data,callback) {
    const {_id,number,type,mother,motherYear,power,status,apiary} = data
    const client =  MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      if (err) {console.warn('Błąd połączenia z bazą danych'); return }
      const dbcon = db.db(username);
      dbcon
        .collection(dbcollection)
        .updateOne(
          { _id: mongodb.ObjectID(_id) },
          { $set: { 
            number:number,type:type, mother:mother,motherYear:motherYear,
            power:power,status:status, apiary:apiary} 
          },
          function (err, result) {
            client.close()
            if ((err === null) && (result.modifiedCount===1)) {
              callback(true);
            } else {
              callback(false);
            }
          }
        );
    });
  },

  addHive: function (username,hive,callback) {
    const {number,type,mother,motherYear,power,status,apiary,isActive}=hive
    const client =  MongoClient(uri,mongoConstructor)
        client.connect(async function (err, db) {
          if (err) {console.warn('Błąd połączenia z bazą danych'); return }
            const dbcon = await db.db(username);
            const hives = await dbcon.collection(dbcollection)
            const query =  { number: number};
            const isExist = await hives.countDocuments(query)
            if (isExist!==0) {
              hives.updateOne(
                  { number: number},
                  { $set: 
                    { 
                      number: number,
                      type:type,
                      mother:mother,
                      motherYear:motherYear,
                      power:power,
                      status:status,
                      apiary:apiary,
                      isActive:true 
                    } 
                  },
                function (err, result) {
                  client.close()
                  if (err === null) {
                    //result.upsertedIds zwraca Id zaktualizowanego rekordu
                    callback(result.upsertedIds);
                    
                  } else {
                    callback(false);
                  }
                }
              );
            }
            else if(isExist === 0) {
                hives.insertOne(
                    {
                      number: number,
                      type:type,
                      mother:mother,
                      motherYear:motherYear,
                      power:power,
                      status:status,
                      apiary:apiary,
                      isActive:isActive
                    },
                    function (err, result) {
                       client.close()
                       //result.insertedCount -zwraca ilość dodanych rekordów (1)
                      if (err === null) {
                        // result.insertedId - zwraca ID dodanego rekordu
                        callback(result.insertedId);
                      } else {
                        callback(false);
                      }
                    }
                  );

            }
            else {console.warn('Błąd bazy danych')}
        });
  },
 
  deleteHive: function (username, hiveID, callback) {
    const client =  MongoClient(uri,mongoConstructor)
    client.connect(function (err, db) {
      if (err) {console.log(`Błąd połączenia z bazą danych: ${err}`); return}
      const dbcon = db.db(username);
      dbcon.collection(dbcollection).updateOne(
        {
          _id: new mongodb.ObjectID(hiveID),

        },
        { $set: { isActive: false } },
        function (err, result) {
          if (err === null) {
            callback(true);
          } else {
            callback(false);
          }
          client.close()
        }
      );
    });
  },


  migrateHives: function (username,hivesNumbers,apiaryID,callback) {
    let bulkArr = [];
    for (const i of hivesNumbers) {
        bulkArr.push({
            updateOne: {
                "filter": { number : i },
                "update": { '$set': { apiary : apiaryID } }
            }
        })
    }
    const client =  MongoClient(uri,mongoConstructor)
    client.connect(async function (err, db) {
      if (err) {console.warn(`Błąd połączenia z bazą danych`);return}
      const dbcon = await db.db(username);
      dbcon.collection(dbcollection).bulkWrite(bulkArr, { ordered : false },function (err, result) {
        client.close()
        if (err === null) {
          callback({modifiedHivesAmount:result.nModified});
        } 
        else {
          callback(false);
        }
        
      })
    })
   // console.log('matchedCount ::', updateResult.matchedCount, 'modifiedCount ::', updateResult.modifiedCount)
   //client.close()  
  },

};

  /*
  getHivesNumbers: function (username, callback) {
    const client =  MongoClient(uri,mongoConstructor)
    async function run() {
      try {
        await client.connect();
        const database = client.db(username)
        const collection = database.collection(dbcollection)
        const query = { isActive:false}
        const options = { projection: {number:1} }
        const count = await collection.estimatedDocumentCount()
        if (count===0) {callback({number:1,count:0})}
        else {
          collection.findOne(query,options, function (err, result) {
            
            if (err === null) {
              console.log(`Jestem w err===null`)
              console.log(`Result:${result}`)
              if (result) { callback({number:result, count:count});}
              else { callback({number:1, count:count}); }
            }
            else {
              console.log(`Result:${result}`)
              callback({number:count+1, count:count});
            }
          }
          );
        }
      } 
      finally {
        await client.close();
      }
    }
    run().catch(console.dir)
    
  },
  */

    /*
   getHives: function (username,apiaryID, callback) {
    const client =  MongoClient(uri,mongoConstructor)
    let query
    async function run() {
      try {
        if(apiaryID==='all') { query = { isActive:true}}
        else { query={ isActive:true , apiary:apiaryID}}
        await client.connect();
        const database = client.db(username)
        const collection = database.collection(dbcollection)
        //const options = {}
        collection.find(query).toArray(function (err, result) {
          console.log(`Result: ${result}`)
          if (err === null) { 
            if (result!==undefined) {callback(result)}  
            else {callback(false)}
            
          }
          else {
            callback(false);
          }
        })
      }
      finally {
        await client.close();
      }
    }
    run().catch(console.dir)
  },

  */
  