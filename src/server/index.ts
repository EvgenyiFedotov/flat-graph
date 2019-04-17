import express from 'express';

const PORT = 5001;
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/api/test', (req, res) => res.send(true));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!\n`);
});
