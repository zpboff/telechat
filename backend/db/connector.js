const mongoose = require('mongoose');
const ConnectionStrings = require('../constants/conStrings')

function initializeDbConnection() {
   mongoose.connect(
      ConnectionStrings.DbRoute,
      {
         useNewUrlParser: true,
         useCreateIndex: true
      }
   );

   let db = mongoose.connection;
   db.once("open", () => console.log("connected to the database"));
   db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

module.exports = initializeDbConnection