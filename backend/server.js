const express = require('express');
// const morgan = require('morgan')
const morganBody = require('morgan-body');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeUrls = require('./routes/routes')
const fs = require('fs')

const cors = require('cors')
const expressSession = require("express-session"); 
const path = require('path');

const FileStore = require('session-file-store')(expressSession);


const coroptions = {
  origin: "http://localhost:3000",
  credentials: true,
  // sameSite: 'none'
}

const log = fs.createWriteStream(
  path.join(__dirname, "logs", "api.access.log")
)



dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))

// app.use(morgan('combined'))

app.use(express.json())

app.use(
    expressSession({
      store: new FileStore({logFn: function(){}}),
      //  store, // Replace me with any of these: https://www.npmjs.com/package/express-session#compatible-session-stores..
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: 'lax',
        httpOnly: true,
        secure: false
        
      }
      
    
    })
  );
app.use(express.json())
morganBody(app, {
  noColors: true,
  prettify: false,
  dateTimeFormat: 'clf',
  includeNewLine: true,
  stream: log,
  skip: function(req, res) { return res.statusCode === 304 || res.statusCode === 204}

});
app.use(cors(coroptions))

app.use('/app', routeUrls)
app.listen(4000, () => console.log("Server is listening on port 4000"));


