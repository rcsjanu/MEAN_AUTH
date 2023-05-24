const express = require("express");
const cors = require("cors");



const app = express();

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: ["http://localhost:4200"],
  credentials: true
}

app.use(cors(corsOptions));


const db = require("./model");


db.mongoose
  .connect(`mongodb+srv://rcs_janu:rcpatel@cluster0.d22dodw.mongodb.net/AuthBackend`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node js application." });
});

require("./route/auth.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


