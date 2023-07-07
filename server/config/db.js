const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function Connection(username, password) {
  const URL = `mongodb+srv://${username}:${password}@buycar.dd1hxbx.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true,
      useUnifiedTopology: true, });
    console.log("Database connection established");
  } catch (error) {
    console.log("Error connecting", error);
  }
}

module.exports={Connection}