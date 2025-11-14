const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const routes = require("./routes");
const { init } = require("./db");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", routes);

app.get("/", (req, res) => {
  res.json({ message: "Auth service is running" });
});

init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Auth service listening at http://0.0.0.0:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize DB", err);
    process.exit(1);
  });
