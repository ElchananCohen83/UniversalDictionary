import * as React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Set minimum height to 100% of the viewport height
      }}
    >
      <div
        style={{
          flex: "1", // Allow the top section to grow and take available space
          backgroundColor: "#21213E",
        }}
      >
        <Header />
        <div
          style={{
            textAlign: "center",
            color: "white",
            padding: "20px", // Add padding for better readability
          }}
        >
          <h1 style={{ fontSize: '8vw', margin: '5vw' }}>המילון האוניברסלי</h1>
          <h2 style={{ fontSize: '5vw' }}>עברי-אנגלי</h2>
          <h2 style={{ fontSize: '5vw' }}>אנגלי-עברי</h2>
          <h2>***</h2>
          <h3 style={{ fontSize: '3vw' }}>עורכת ראשית: ינטי הופמן</h3>
        </div>
      </div>
      <Footer
        style={{
          flexShrink: 0, // Prevent the footer from shrinking
        }}
      />
    </div>
  );
}
