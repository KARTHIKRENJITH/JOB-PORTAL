const express = require('express');
const notFound = require('./Middleware/notFound');
const errorHandler = require('./Middleware/errorHandler');
const UserRoute = require('./Routes/Route');
const connectDB = require('./ConnectData/ConnectDB');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');   

const app = express();


app.use(cors({origin:["http://127.0.0.1:5173","http://localhost:5173"],credentials:true,}));

require('dotenv').config();

app.use(express.json());  
app.use("/job", UserRoute);
app.use(notFound);
app.use(errorHandler);


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8920

const startApp=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to database');
        app.listen(port,()=>{
            console.log('server running on port 8920');
        })
        
    } catch (error) {
        console.log(error);
    } 
}


startApp()