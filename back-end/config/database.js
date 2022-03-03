const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;

mongoose.connect(process.env.KEY_DB).then(() => console.log("Successful database connection")).catch((error) => console.log("Failed database connection", error));