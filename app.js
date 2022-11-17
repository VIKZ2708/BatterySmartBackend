const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./routes/userRoutes");
const entryRoute = require("./routes/entryRoutes");

// setting middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
    
app.use(cors(corsOptions)) 
// setting error path
console.log("csbhbsjhdbjdsjhvb")
app.use("/tasks", userRoute);

app.use("/entries",entryRoute)

app.use((req, res, next) => {
    const err = new Error(`${req.url} not found in this server`);
    err.status = 404;
    next(err);
});
// setting another error program
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});
// export app
module.exports = app;
