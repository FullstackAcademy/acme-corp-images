const express = require('express');
const app = express();
const path = require('path');
const { conn, Image } = require('./db');

app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/images', async(req, res, next)=> {
  try {
    res.send(await Image.findAll());
  }
  catch(ex){
    next(ex);
  }
});

const setup = async()=> {
  try {
    await conn.sync({ force: true });
    const port = process.env.port || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setup();
