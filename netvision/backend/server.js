const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const devices = [
  {
    id: 1,
    name: "Router-1",
    ip: "192.168.1.1",
    status: "Online",
    vlan: 10,
    mac: "00:1A:2B:3C:4D"
  },
  {
    id: 2,
  name: "Switch-1",
  ip: "192.168.1.2",
  status: "Online",
  vlan: 20,
  mac: "00:1A:2B:3C:4E"
  },
  {
    id: 3,
    name: "PC-1",
    ip: "192.168.1.10",
    status: "Offline",
    vlan: 10,
    mac: "00:1A:2B:3C:4F"
  }
];

app.get("/devices", (req, res) => {
  res.json(devices);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});