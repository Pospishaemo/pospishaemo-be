require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const AuthRouting = require('./routing/auth.routing');
const ContactRouting = require('./routing/contact.routing');
const TrafficRulesRouting = require('./routing/traffic-rule.routing');
const RoadSignRouting = require('./routing/road-sign.routing');
const TestRouting = require('./routing/test.routing');
const errorHandler = require('./utils/error-handler');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use('/api/auth', AuthRouting);
app.use('/api/contact', ContactRouting);
app.use('/api/traffic-rule', TrafficRulesRouting);
app.use('/api/road-sign', RoadSignRouting);
app.use('/api/test', TestRouting);

app.use(errorHandler);

app.all('*', (req, res, next) => {
  res.status(200).send({
    data: {
      type: 'UNEXPECTED',
      message: 'Link does not exist!',
    },
    success: false,
  });
});

const start = () => {
  mongoose.connect(process.env.MONGO_DB_LINK).then(() => {
    console.log('Successfully connected to database!');

    app.listen(PORT, () => {
      console.log('successfully created!');
    });
  });
};

start();
