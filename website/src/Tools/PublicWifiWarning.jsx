import React, { useState, useEffect } from "react";
import "./PublicWifiWarning.css";

const suspiciousSSIDs = ["Free_Wifi", "Airport_Wifi", "CoffeeShop", "OpenNetwork", "Railway_Free", "HotelGuest", "PublicWifi"];

const PublicWifiWarning = () => {
  const [checking, setChecking] = useState(true);
  const [riskDetected, setRiskDetected] = useState(false);
  const [ssid, setSsid] = useState("");
  const [isHTTPS, setIsHTTPS] = useState(true);

  useEffect(() => {
    // Simulate scanning
    const fakeSSID = suspiciousSSIDs[Math.floor(Math.random() * suspiciousSSIDs.length)];
    setSsid(fakeSSID);

    setTimeout(() => {
      setChecking(false);
      setRiskDetected(true);
    }, 3000);

    // Check if user is on HTTPS
    setIsHTTPS(window.location.protocol === "https:");
  }, []);

  return (
    <div className="wifi-container">
      <h2>🔍 Public WiFi Safety Checker</h2>

      {checking ? (
        <div className="scan-box">
          <div className="loader" />
          <p>Scanning nearby WiFi networks...</p>
        </div>
      ) : (
        <div className={`result-box ${riskDetected ? "warning" : "safe"}`}>
          <h3>{riskDetected ? "⚠️ Risky Network Detected!" : "✅ You're Safe!"}</h3>
          <p><strong>SSID:</strong> {ssid}</p>
          {!isHTTPS && (
            <p className="not-https">⚠️ You're not using a secure (HTTPS) connection!</p>
          )}
          <p className="tip">
            {riskDetected
              ? "Avoid entering personal details or passwords. Consider using a VPN."
              : "You're connected to a known secure network."}
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicWifiWarning;
