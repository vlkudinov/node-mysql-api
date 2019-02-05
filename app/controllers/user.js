import passport from 'passport/lib/index';

export const login = (req, res) => {
  res.render('login/form');
};
export const logout = (req, res) => {
  res.flash('info', `Goodbye, ${req.user.username}!`);
  req.logout();
  res.redirect('/');
};

export const authenticate = passport.authenticate('local-login', {
  successRedirect: '/countries',
  failureRedirect: '/',
  failureFlash: true
});



