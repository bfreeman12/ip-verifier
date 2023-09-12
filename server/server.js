import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import expressRateLimit from "express-rate-limit";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "../.env" });

const ip_address = process.env.IP;
const client_port = process.env.PORT;
const server_port = process.env.SERVER_PORT;
const api_key = process.env.API_KEY;
const api_url = `https://endpoint.apivoid.com/iprep/v1/pay-as-you-go/?key=${api_key}&ip=`;

const limiter = expressRateLimit({
  max: 3,
  windowMs: 1000,
});

app.use(
  cors({
    origin: `http://${ip_address}:${client_port}`,
  })
);

app.use(bodyParser.json());

app.listen(server_port, () => {
  console.log(`Server running on port ${server_port}`);
});

app.post("/api/post-ip", limiter, function (req, res, next) {
  req.body.forEach((address) => {
    console.log(address);
    axios.get(api_url + address).then((response) => {
      //response has objects inside of it. need to parse the objects for the real data
      // also will need to hook this into saving into a database when finished
      // db format would possibly go reports - (date of report) - ip,score,blacklist
      const data = response.data;
      console.log(data);
    });
  });
});

app.use(function (req, res) {
  res.status(404).send("404 - Not Found");
});
