module.exports = {
    //Local mongodb 
   uri:  "mongodb://localhost:27017",
    //Remoto mongodb from Atlas Cluster service
    //uri : "mongodb+srv://beekeeper:Misio123PK@cluster0.fwg7e.mongodb.net/?retryWrites=true&w=majority",
    
    mongoConstructor: {
       useNewUrlParser: true, 
       useUnifiedTopology: true
    }
}


