const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function Connection(username, password) {
  const URL = `mongodb://${username}:${password}@ac-jdcsfa4-shard-00-00.dd1hxbx.mongodb.net:27017,ac-jdcsfa4-shard-00-01.dd1hxbx.mongodb.net:27017,ac-jdcsfa4-shard-00-02.dd1hxbx.mongodb.net:27017/?ssl=true&replicaSet=atlas-dsc0iw-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true,
      useUnifiedTopology: true, });
    console.log("Database connection established");
  } catch (error) {
    console.log("Error connecting", error);
  }
}

module.exports={Connection}