module.exports = {
    //Local mongodb 
  //uri:  "mongodb://localhost:27017",
    //Remoto mongodb from Atlas Cluster service
   uri : "mongodb+srv://beekeeper:Misio123PK@cluster0.7m9ur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    //uri: "mongodb+srv://server463111_beekeeper:Misio123PK@server463111_beekeeper.mongodb.server463111.nazwa.pl",
    //uri:  "mongodb://mongodb.server463111.nazwa.pl:4024/server463111_beekeeper",
    mongoConstructor: {
       useNewUrlParser: true, 
       useUnifiedTopology: true
    }
}


