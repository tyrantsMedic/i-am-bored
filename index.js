import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(dirname(import.meta.url));
const app = express();
const port = process.env.PORT || 80;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render(__dirname + "index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render(__dirname + "index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try{
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`);
    const data = response.data;
    const random = Math.floor(Math.random() * data.length);
    res.json(data[random]);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.json(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
