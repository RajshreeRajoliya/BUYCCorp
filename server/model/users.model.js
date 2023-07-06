const mongoose = require("mongoose");

//User Schema specifying the keys user need to enter, also type is mentioned

const userModelSchema = mongoose.Schema({

  name: 
  { 
    type: String,
    required: true 
},
  email: 
  { 
    type: String,
    required: true  
},
  date: 
  { 
    type: String,
    required: true  
},
  password: 
  {
    type: String,
    required: true  
    },
  profilePic:
  {
    type: String
}
});

const UserModel = mongoose.model("user", userModelSchema);

module.exports = { UserModel };
