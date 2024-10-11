const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      console.log('received credentials:', username, password);
      const user = await Person.findOne({ username });  // Use await to fetch user
  
      if (!user)
        return done(null, false, { message: "Incorrect username." });
  
      const isPasswordMatch = user.password === password;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    } catch (err) {
      return done(err);
    }
  }));
  

  module.exports=passport