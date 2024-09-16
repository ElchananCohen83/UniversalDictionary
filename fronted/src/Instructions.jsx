import * as React from "react";

export default function Instructions() {
    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh", // Set minimum height to 100% of the viewport height
                backgroundColor: "#21213E",
            }}
        >
            <div style={{
                flex: 1,
                width: "50%",
                height: "400px", // Set a fixed height for the container
                margin: "auto",
                marginTop: "20px",
                marginBottom: "20px",
                padding: "20px",
                textAlign: "right",
                backgroundColor: "#f0e9a5",
                color: "black",
                overflowY: "auto", // Add a scrollbar when content overflows
            }}>
                <h1>המדריך</h1>
               
            </div>
        </div>
    );
}
