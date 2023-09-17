import express from "express";
import bodyParser from "body-parser";
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
    const response = await axios.get("http://www.boredapi.com/api/activity/");
    const result = response.data;
    result.type = result.type[0].toUpperCase() + result.type.slice(1);
    res.render(__dirname + "/views/index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render(__dirname + "/views/index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try{
    const response = await axios.get(`http://www.boredapi.com/api/activity?type=${req.body.type}`);
    const result = response.data;
    result.type = result.type[0].toUpperCase() + result.type.slice(1);
    res.json(result);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.json(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
