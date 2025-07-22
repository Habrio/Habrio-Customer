import React from "react";
import "../styles/common.css";

const Otp = () => {
  return (
    <div className="mobile-screen" id="screen-3">
      <div className="status-bar">
        <span className="time">9:41</span>
        <span className="battery">🔋</span>
      </div>

      <div className="screen-content">
        <div className="screen-header">
          <button className="back-button" onClick={() => window.history.back()}>←</button>
          <span></span>
          <span></span>
        </div>

        <div className="text-center mb-lg">
          <div
            style={{
              background: "linear-gradient(135deg, #1A237E 0%, #3F51B5 100%)",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <span style={{ fontSize: "32px", color: "white" }}>🔐</span>
          </div>
          <h2 className="title">Verify Phone Number</h2>
          <p className="subtitle">
            Enter the 6-digit code sent to
            <br />
            <strong>+91 98765 43210</strong>
          </p>
        </div>

        <div className="otp-container">
          <div className="otp-inputs">
            <input type="text" className="otp-input" maxLength={1} />
            <input type="text" className="otp-input filled" maxLength={1} defaultValue="1" />
            <input type="text" className="otp-input filled" maxLength={1} defaultValue="2" />
            <input type="text" className="otp-input filled" maxLength={1} defaultValue="3" />
            <input type="text" className="otp-input" maxLength={1} />
            <input type="text" className="otp-input" maxLength={1} />
          </div>

          <div className="text-center">
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Didn’t receive code?
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "var(--primary-color)",
                fontWeight: 600,
              }}
            >
              Resend in 0:45
            </p>
          </div>
        </div>

        <button className="btn btn-primary btn-full btn-large">Verify</button>
      </div>
    </div>
  );
};

export default Otp;
