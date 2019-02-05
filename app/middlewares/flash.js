export default () => (req, res, next) => {
  res.locals.flash = req.session.flash || [];
  req.session.flash = [];
  res.flash = (type, message) => {
    req.session.flash.push({ type, message });
  };
  req.flash = (type, message) => {
    req.session.flash.push({ type, message });
  };

  next();
};
