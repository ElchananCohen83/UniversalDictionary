import * as React from "react";
import Header from ".//components/Header";
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
        }}>

        <Header />
        <div style={{ textAlign: 'center', color: "white"}}>
          <h1 style={{fontSize: '100px', margin: '50px'}}>המילון האוניברסלי</h1>
          <h2 style={{fontSize: '50px'}}>עברי-אנגלי</h2>
          <h2 style={{fontSize: '50px'}}>אנגלי-עברי</h2>
          <h2>***</h2>
          <h3 style={{fontSize: '30px'}}>עורכת ראשית: ינטי הופמן</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
}
