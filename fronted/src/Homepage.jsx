import * as React from "react";

export default function HomePage() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#21213E",
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
      }}
    >
      <div
        style={{
          flex: "1",
          textAlign: "center",
          color: "white",
          padding: "20px", // Add padding for better readability
        }}
      >
        <h1 style={{ fontSize: "6vw", marginTop: "3vw" }}>המילון</h1>
        <h2 style={{ fontSize: "3vw" }}>עברי-אנגלי</h2>
        <h2 style={{ fontSize: "3vw" }}>אנגלי-עברי</h2>
        <h2>***</h2>
      </div>
    </div>
  );
}