const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at ${port}`));
app.use(express.static("public"));

app.get("/getteaminfo", async(request, response) => {
    try {
        const apiKey = process.env.API_KEY;
        const fetchResponse = await fetch("https://rugby-live-data.p.rapidapi.com/fixtures-by-team/1817", {
            "method": "GET", 
            "headers": {
                "x-rapidapi-key": apiKey,
                "x-rapidapi-host": "rugby-live-data.p.rapidapi.com"
            }
        })
        const jsonResponse = await fetchResponse.json();
        return response.json(jsonResponse);
    } catch (err) {
        console.log("Sorry, error encountered");
        console.log(err);
    }
})