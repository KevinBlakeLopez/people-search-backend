const createError = require("http-errors");
const { application } = require("express");
const express = require("express");
const cors = require("cors");

const searchRouter = require("./routes/persons-server.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/people", searchRouter);

app.use(funtion(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {}

    //render the error page
    res.status(err.status || 500);
    res.render("error");
});

