import React, { useState } from "react";
import sha1 from "crypto-js/sha1";
import zxcvbn from "zxcvbn";
import "./PasswordChechker.css";

const PasswordChecker = () => {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [breachCount, setBreachCount] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Password strength
  const strength = zxcvbn(password);
  const strengthScore = strength.score; // 0-4
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["#ff5252", "#ff9800", "#ffd600", "#4caf50", "#2196f3"];

  const checkPassword = async () => {
    if (!password) return;
    setStatus("Checking...");
    const hashed = sha1(password).toString().toUpperCase();
    const prefix = hashed.substring(0, 5);
    const suffix = hashed.substring(5);
    try {
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const text = await response.text();
      const lines = text.split("\n");
      const match = lines.find(line => line.startsWith(suffix));
      if (match) {
        const count = parseInt(match.split(":")[1].trim());
        setBreachCount(count);
        setStatus("⚠️ This password has been found in breaches!");
      } else {
        setBreachCount(0);
        setStatus("✅ This password was NOT found in known breaches.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Error checking password.");
    }
  };

  return (
    <div className="checker-page-wrapper">
      <section className="checker-card" aria-label="Password Breach Checker">
        <h2 className="checker-title">
          <span role="img" aria-label="shield">🛡️</span> Password Breach Checker
        </h2>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <button
            type="button"
            className="toggle-visibility"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button className="check-btn" onClick={checkPassword} disabled={!password}>
          Check
        </button>
        <div className={`status-message ${breachCount > 0 ? "warning" : breachCount === 0 ? "safe" : ""}`}
          aria-live="polite">
          {status && (
            <span className="status-icon">
              {status.startsWith("✅") && "✅"}
              {status.startsWith("⚠️") && "⚠️"}
              {status.startsWith("❌") && "❌"}
            </span>
          )}
          {status.replace(/^([✅⚠️❌])\s*/, "")}
        </div>
        {breachCount > 0 && (
          <p className="count">
            <span role="img" aria-label="alert">📛</span> Found in <strong>{breachCount}</strong> breaches
          </p>
        )}
      </section>
      {/* Password Strength Meter */}
      <div className="strength-meter-wrapper">
        <div className="strength-meter-bar" style={{ width: `${((strengthScore + 1) / 5) * 100}%`, background: strengthColors[strengthScore] }} />
        <div className="strength-meter-label" style={{ color: strengthColors[strengthScore] }}>
          {password ? strengthLabels[strengthScore] : ""}
        </div>
        {password && strength.feedback.suggestions.length > 0 && (
          <div className="strength-meter-feedback">
            <ul>
              {strength.feedback.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordChecker;
