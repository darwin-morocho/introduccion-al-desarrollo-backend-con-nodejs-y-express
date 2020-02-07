const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const routesV1 = require('./routes/v1');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesV1(app);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to mongodb');
    app.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });
  })
  .catch(error => {
    console.log('mongdb error', error);
  });
