import app from './app';

app.listen(process.env.PORT || 5000, function() {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});
