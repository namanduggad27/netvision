import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import React, { useEffect, useState } from "react";
import "./App.css";
ChartJS.register(ArcElement, Tooltip, Legend);
function App() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const logs = [
  "10:45 - Router connected",
  "10:46 - Switch active",
  "10:47 - PC-1 offline"
];
  useEffect(() => {
    fetch("http://localhost:5000/devices")
      .then((res) => res.json())
      .then((data) => setDevices(data));
  }, []);

 const onlineCount = devices.filter(
  (device) => device.status === "Online"
).length;

const offlineCount = devices.length - onlineCount;
const chartData = {
  labels: ["Online", "Offline"],
  datasets: [
    {
      data: [onlineCount, offlineCount],
      backgroundColor: ["#22c55e", "#ef4444"]
    }
  ]
};

const filteredDevices = devices.filter(
  (device) =>
    device.name.toLowerCase().includes(search.toLowerCase()) ||
    device.ip.includes(search)
);
  return (
    <div className="app">
      <h1>NetVision Dashboard</h1>
      <div className="topology">
  <h2>Network Topology</h2>
  <p>Router-1 → Switch-1 → PC-1</p>
</div>
      <div className="stats">
        <input
  type="text"
  placeholder="Search by device or IP..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search"
/>
        <div className="stat-card">Total Devices: {devices.length}</div>
        <div className="stat-card">Online: {onlineCount}</div>
        <div className="stat-card">Offline: {offlineCount}</div>
      </div>

      <div className="device-grid">
        {filteredDevices.map((device) => (
          <div className="device-card" 
          key={device.id}
          onClick={() => setSelectedDevice(device)}
>
            <h2>{device.name}</h2>
            <p>IP: {device.ip}</p>
            <p>VLAN: {device.vlan}</p>
            <p className={device.status === "Online" ? "online" : "offline"}>
              {device.status}
            </p>
          </div>
        ))}
        <div className="chart-box">
  <h2>Network Status Chart</h2>
  <div style={{ width: "300px" }}>
    <Pie data={chartData} />
  </div>
</div>
        <div className="logs">
  <h2>Event Logs</h2>
  {logs.map((log, index) => (
    <p key={index}>{log}</p>
  ))}
</div>
        {selectedDevice && (
  <div className="popup">
    <div className="popup-content">
      <h2>{selectedDevice.name}</h2>
      <p>IP: {selectedDevice.ip}</p>
      <p>VLAN: {selectedDevice.vlan}</p>
      <p>MAC: {selectedDevice.mac}</p>
      <p>Status: {selectedDevice.status}</p>
      <button onClick={() => alert("Reply from " + selectedDevice.ip + " (2ms)")}>
  Ping Device
</button>
      <button onClick={() => setSelectedDevice(null)}>Close</button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default App;