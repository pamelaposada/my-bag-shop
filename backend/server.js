const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeUrls = require('./routes/routes')

const cors = require('cors')
const expressSession = require("express-session"); 
const FileStore = require('session-file-store')(expressSession);


const coroptions = {
  origin: "http://localhost:3000",
  credentials: true,
  // sameSite: 'none'
}

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))

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
app.use(cors(coroptions))
app.use('/app', routeUrls)
app.listen(4000, () => console.log("Server is listening on port 4000"));


