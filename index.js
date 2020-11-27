const express = require("express");
const axios = require("axios");

const app = express();
const base_url = "https://factchecktools.googleapis.com";
const api_key = "AIzaSyDhN7wNx9w8BOBDYOMRN_1iHoQHhcOxn3E";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    const { data } = await axios.get(
      `${base_url}/v1alpha1/claims:search?query=${q}&languageCode=es_ES&key=${api_key}`
    );

    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(8080, () => {
  console.log("server ok");
});
