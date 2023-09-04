import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

import dotenv from "dotenv"
dotenv.config({ path: "../.env" });

const ip_address = process.env.IP;
const client_port = process.env.PORT;
const server_port = process.env.SERVER_PORT;
const api_key = process.env.API_KEY
// const api_url = " https://www.ipqualityscore.com/api/json/requests/{apikey}/list?type=proxy&ip_address="
app.use(
    cors({
        origin: `http://${ip_address}:${client_port}`,
    })
);

app.use(bodyParser.json());

app.listen(server_port, () => {
    console.log(`Server running on port ${server_port}`);
});

app.post(
    "/api/post-ip",
    function (req, res, next) {
        req.body.forEach(address => {
            console.log(address)
            axios.get(`https://ipqualityscore.com/api/json/ip/{apikey}/${address}`).then((response) => {
                const data = response.data
                console.log(data)
            })
        });

    }
);


app.use(function (req, res) {
    res.status(404).send("404 - Not Found");
});