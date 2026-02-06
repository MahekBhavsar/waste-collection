const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

const app = express();
app.use(cors());
app.use(express.json());

const BASE = "https://iweb.itouchvision.com/portal/itouchvision/kmbd_demo";
const GUID = "FF93E12280E5471FE053A000A8C08BEB";

app.post("/api/address", async (req, res) => {
  const params = new URLSearchParams();
  params.append("P_GUID", GUID);
  params.append("P_POSTCODE", req.body.postcode);
  const response = await fetch(`${BASE}/address`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });
  const data = await response.json();
  res.json(data);
});

app.post("/api/collection", async (req, res) => {
  const params = new URLSearchParams();
  params.append("P_GUID", GUID);
  params.append("P_UPRN", req.body.uprn);
  params.append("P_CLIENT_ID", "130");
  params.append("P_COUNCIL_ID", "260");
  const response = await fetch(`${BASE}/collectionDay`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });
  const data = await response.json();
  res.json(data.collectionDay || []);
});

module.exports = app;