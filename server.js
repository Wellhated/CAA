const express = require("express");
const { append } = require("express/lib/response");
const { google } = require("googleapis");
const fs = require('fs');
const { dirname } = require("path");

server = express();

server.all("*", function (req, resp, next) {
    console.log(`${req.method} ${req.url}`);
    next();
});

server.use("/", express.static("CAA_ID"));

server.get('/api', async(req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets" 
    });    
 
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });


    fs.readFile("./config.json", { root: __dirname }, async (err, data) => {
        if (err) throw err;
        const spreadsheetId = await JSON.parse(data).spreadsheetID;
        console.log(data);


            // Get metadata about spreadsheet
        const metaData = await googleSheets.spreadsheets.get({
            auth,
            spreadsheetId
        });

        // Read rows from spreadsheet
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Form responses 1!B:K",
        });
        
        res.send(JSON.stringify(getRows.data.values));
        fs.writeFile('students.json', JSON.stringify(getRows.data, null, 4), (err) => {
            if (err) throw err;
            console.log("FILE SAVED!");
        });

        res.end();
    });
});

server.listen(3000, (req, res) => {
    console.log("Running on localhost:3000");
});





