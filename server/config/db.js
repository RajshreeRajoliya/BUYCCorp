// const mongoose = require("mongoose");
// require("dotenv").config()

// //this database connection is made with the help of mongoose Mongodb_Url
// //and that will help to connect with databse and help in store our data in database
// const dataBaseConnection = mongoose.connect(process.env.mongoDb_Url);
// module.exports = { dataBaseConnection };


const mongoose = require("mongoose");
require("dotenv").config()

mongoose.set("strictQuery", false);

const ConnectDB = () => {
  mongoose
    .connect("mongodb://rajshreerajoliya:attryb@ac-jdcsfa4-shard-00-00.dd1hxbx.mongodb.net:27017,ac-jdcsfa4-shard-00-01.dd1hxbx.mongodb.net:27017,ac-jdcsfa4-shard-00-02.dd1hxbx.mongodb.net:27017/?ssl=true&replicaSet=atlas-dsc0iw-shard-0&authSource=admin&retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database connected ${data.connection.host}`);
    });
};

module.exports = {ConnectDB};
