var express = require("express");
var app = express();
var axios = require("axios");
var parse = require("csv-parse");

const Headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer aSuperSecretKey",
};

// Obtener la data de los files
app.get("/data/files", async (request, response) => {
  const Response = await axios(
    "https://echo-serv.tbxnet.com/v1/secret/files/",
    {
      headers: Headers,
    }
  );
  if (Response.status === 200 && Response.statusText === "OK") {
    const dataFiles = Response.data.files;
    const FormatedFiles = await readSyncFiles(dataFiles);
    return response.status(200).json({
        status: true,
        message: "Files returned successfully",
        data: FormatedFiles
    });
  } else {
    return response.status(500).json({
      status: false,
      message: "We couldn't connect to the external API",
    });
  }
});

const readSyncFiles = async (files) => {
  return new Promise((resolve) => {
    formatedFiles = new Array();
    let counter = 0;
    files.forEach(async (file) => {
      try {
        let readedFile = await axios(
          `https://echo-serv.tbxnet.com/v1/secret/file/${file}`,
          {
            headers: Headers,
          }
        );
        if (readedFile.status === 200) {
          parse.parse(
            readedFile.data,
            {
              delimiter: ",",
              skipRecordsWithError: true,
              skipRecordsWithEmptyValues: true,
            },
            (err, records) => {
              formatedFiles.push(records);
            }
          );
        }
      } catch (err) {
        // This one will catch the files with errors
        console.error(err.message);
      }
      counter++;
    });
    setTimeout(() => {
      if (counter >= 0) {
        resolve(formatedFiles);
      } else {
        resolve([]);
      }
    }, 600);
  });
};

module.exports = app;
