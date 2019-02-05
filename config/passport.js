import * as User from '../model/user';
import Strategy from 'passport-local';
const LocalStrategy = Strategy;

export default passport => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(User.load);
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      User.password
    )
  );
};
