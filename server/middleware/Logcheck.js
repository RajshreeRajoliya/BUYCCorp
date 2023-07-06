const Logcheck = (req, res, next) => {
    const date = new Date();
  //Middleware used to log the date 
    const options = 
    {
        timeZone : "Asia/Kolkata",

        year : "numeric",

        month : "long",

        day : "numeric",

        hour : "numeric",

        minute : "numeric",

        second : "numeric"
    }
  
    const Time = date.toLocaleString("en-IN", options);
  
    req.body.date = Time;
    next();//Moving to next route
  };
  
  module.exports = { Logcheck };