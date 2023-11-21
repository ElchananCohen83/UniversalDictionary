import * as React from "react";
import Header from ".//components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div
      style={{
        backgroundColor: "#21213E",
      }}
    >
      <Header />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          backgroundColor: "#21213E",
        }}
      ></div>
      <Footer />
    </div>
  );
}
