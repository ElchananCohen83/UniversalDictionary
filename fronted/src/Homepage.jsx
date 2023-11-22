import * as React from "react";
import Header from ".//components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div style={{ border: "1px solid green" }}>
      <Header />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          backgroundColor: "#21213E",
          border: "1px solid red",
        }}
      ></div>
      <Footer />
    </div>
  );
}
