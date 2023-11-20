import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const TranslationResult = ({ translations }) => {
  // Check if translations exist, if not, return null
  if (!translations || translations.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {translations.map((translation, index) => (
        <Paper
          key={index}
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            width: 400,
            backgroundColor: "#F6C927",
            marginTop: "10px",
          }}
        >
          <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>
            {`Original: ${translation.ORIGIN}`}
          </Typography>
          <Typography variant="subtitle1">{`Translated: ${translation.TRANS}`}</Typography>
        </Paper>
      ))}
    </div>
  );
};

export default TranslationResult;
