const mongodb = require("mongoose")
mongodb.connect('mongodb+srv://**:**@cluster0.tc0z9js.mongodb.net/gamebrige?retryWrites=true&w=majority',{
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(success => console.log("mongoDB bağlandı"))
 .catch(err => console.log(err)) 
