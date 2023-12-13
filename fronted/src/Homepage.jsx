import * as React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          backgroundColor: "#21213E",
          height: "110vh",
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
          <h1 style={{ fontSize: '5vw', margin: '2vw' }}>המילון האוניברסלי</h1>
          <h2 style={{ fontSize: '3vw' }}>עברי-אנגלי</h2>
          <h2 style={{ fontSize: '3vw' }}>אנגלי-עברי</h2>
          <h2>***</h2>
          <h3 style={{ fontSize: '2vw' }}>עורכת ראשית: ינטי הופמן</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
}
