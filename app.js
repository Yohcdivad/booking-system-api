const express = require('express')
const cors = require("cors");

const app = express();

app.use(express.json())


var corsOptions = {
  origin: "http://localhost:3002"
};

app.use(cors());

//testing get method 
app.get('/', function (req, res) {
  res.send({data:100});
})

//connect to the databases
const db = require("./app/models");
db.sequelize.sync( { force: true } )
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/booking.routes")(app);

app.listen(3001)