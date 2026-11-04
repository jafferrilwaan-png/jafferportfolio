import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import RobotHandVoid from "./test-lab/RobotHandVoid";
import "./index.css";

function RootSwitcher() {
  const [showRobot, setShowRobot] = useState(() => {
    if (window.location.search.includes("portfolio")) return false;
    return true;
  });

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 999999,
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          onClick={() => setShowRobot(!showRobot)}
          style={{
            background: "rgba(10, 15, 30, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: showRobot ? "#00f0ff" : "#ffffff",
            border: showRobot ? "1.5px solid #00f0ff" : "1px solid rgba(255,255,255,0.25)",
            borderRadius: "20px",
            padding: "8px 16px",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: showRobot ? "0 0 15px rgba(0,240,255,0.4)" : "none",
            transition: "all 0.25s ease",
          }}
        >
          {showRobot ? "🌐 View Portfolio" : "🤖 View 3D Robot Arena"}
        </button>
      </div>
      {showRobot ? <RobotHandVoid /> : <App />}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootSwitcher />
  </StrictMode>
);
