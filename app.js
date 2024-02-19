const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db.config");
const cors = require("cors");
var bodyParser = require('body-parser');

// var corsOptions = {
//     origin: "*"
// };
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: "200mb" }));
require("./routes/index")(app)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`app is runnig on http://localhost:${port}`)
})
