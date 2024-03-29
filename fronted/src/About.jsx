import * as React from "react";

export default function About() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Set minimum height to 100% of the viewport height
        backgroundColor: "#21213E",
      }}
    >
      <div
        style={{
          flex: "1", // Allow the content to grow and take available space
          textAlign: "center",
          color: "white",
          // padding: "20px", // Add padding for better readability
        }}
      >
        <h1 style={{ fontSize: '8vw', marginTop: '5vw' }}>אודות</h1>
        <h2 style={{ fontSize: '5vw' }}>עברי-אנגלי</h2>
        {/* <h2 style={{ fontSize: '5vw' }}>אנגלי-עברי</h2>
        <h2>***</h2>
        <h3 style={{ fontSize: '3vw' }}>עורכת ראשית: ינטי הופמן</h3> */}
      </div>
    </div>
  );
}
