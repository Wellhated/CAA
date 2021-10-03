const express = require("express");
const { append } = require("express/lib/response");
const { google } = require("googleapis");
const fs = require('fs');
const { dirname, resolve } = require("path");
const { oauth2 } = require("googleapis/build/src/apis/oauth2");
const command = require("nodemon/lib/config/command");
const fsx = require("fs-extra");

server = express();

server.all("*", function (req, resp, next) {
    // console.log(`${req.method} ${req.url}`);
    next();
});

server.use("/", express.static("App"));

server.get('/api', async(req, res) => {

    console.log(req.query.spreadsheetID);

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets" 
    });    
    
    const client = await auth.getClient();
    const googleSheets = await google.sheets({ version: "v4", auth: client });
    

    fs.readFile("./config.json", { root: __dirname }, async (err, config) => {
        if (err) throw err;
        const spreadsheetId = (req.query.spreadsheetId).length == 0 ? await JSON.parse(config).spreadsheetID : req.query.spreadsheetId;

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
    

        fs.readFile("./drive_client.json", { root: __dirname }, async (err, client) => {
            
            var OAauth = JSON.parse(client).web;

            const REFRESH_TOKEN = "1//04aau1ExCZIpXCgYIARAAGAQSNwF-L9IrdBb9lemz9neu5Ew9eAOenwGMQj7eWBApPvTFf3hvNLCsCaoIl_33BkYoolI3z0Ff4ps";

            const OAuth2Client = new google.auth.OAuth2(
                OAauth.client_id,
                OAauth.client_secret,
                OAauth.redirect_uris[0]
            );

            OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

            const drive = google.drive({
                version: 'v3',
                auth: OAuth2Client 
            });
            
            var data = getRows.data.values;
            getRows.data.values.shift();

            var i = 0;
            while(i < data.length) {

                let file_id = data[i][9].substring(33);
                
                await drive.permissions.create({
                    fileId: file_id,
                    requestBody: {
                        role: "reader",
                        type: "anyone"
                    }
                });
                
                var dest = new fs.createWriteStream(`${__dirname}/App/tmp/${((data[i][0] + " " + data[i][2]).split(" ")).join("-")}.jpg`);

                const img = await drive.files.get({
                    fileId: file_id,
                    alt: "media",
                }, { responseType: "stream" });

                (img.data).on("end", async () => {
                    console.log("Fetching Image: " + file_id);
                }).on("finish", () => {
                    console.log("Fetch Success!");  
                }).pipe(dest);

                i++;
            }
            i = 0;

            res.send(data);
            res.end();

        });
    });

});

server.get('/api/tmp/delete', async(req, res) => {
    fsx.emptyDir(__dirname + "/App/tmp");
    res.end();
});

server.listen(3000, (req, res) => {
    console.log("Running on localhost:3000");
});





