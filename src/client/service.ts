import express from 'express';
import path from 'path';

const PORT = 5000;
const app = express();
const root = 'dist/client';

app.use(express.static(root));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('*', (req, res) => res.sendFile('main.html', { root }));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!\n`);
});
