import React from "react";
import "../styles/common.css";

const TitleScreen = () => {
  return (
    <div className="mobile-screen" id="screen-1">
      <div className="status-bar">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>

      <div className="screen-content">
        <div
          className="flex flex-column flex-center"
          style={{ height: "100%", textAlign: "center" }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #1A237E 0%, #3F51B5 100%)",
              width: "120px",
              height: "120px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <span style={{ fontSize: "48px", color: "white" }}>H</span>
          </div>

          <h1
            style={{
              fontSize: "32px",
              background: "linear-gradient(135deg, #1A237E 0%, #3F51B5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "8px",
            }}
          >
            Habrio
          </h1>

          <p className="subtitle">Complete Mobile Commerce Experience</p>

          <div className="grid grid-2 gap-md" style={{ marginTop: "32px" }}>
            {[
              ["🔒", "Secure Authentication"],
              ["🏪", "Local Shop Discovery"],
              ["💳", "Digital Wallet"],
              ["📍", "Real-time Tracking"],
            ].map(([icon, label], i) => (
              <div key={i} className="card text-center">
                <span
                  style={{
                    fontSize: "24px",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  {icon}
                </span>
                <span style={{ fontSize: "12px", fontWeight: "600" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary btn-full btn-large"
            style={{ marginTop: "40px" }}
            onClick={() => window.location.href = "/login"}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;
