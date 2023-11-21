import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

//const TranslationResult = ({ translations: data }) => {
const TranslationResult = () => {
  const data = [
    {
      _id: "654d7f226c2a98bc7af18dc5",
      original: "Ethics of the Fathers (coll)",
      translation: "פִּרְקֵי אָבוֹת",
    },
    {
      _id: "654d7f6ec1f2f17dd35c6488",
      original: "father (n)",
      translation: "אַבָּא ■ אָב",
    },
    {
      _id: "654d7f6ec1f2f17dd35c6489",
      original: "fatherhood (n)",
      translation: "אֲבָהוּת",
    },
    {
      _id: "654d7f6ec1f2f17dd35c648a",
      original: "father-in-law (n) (pl fathers-in-law)",
      translation: "חוֹתֵן ■ חָם",
    },
    {
      _id: "654d7f6ec1f2f17dd35c648b",
      original: "fatherland (n)",
      translation: "אֶרֶץ אָבוֹת",
    },
    {
      _id: "654d7f6ec1f2f17dd35c648c",
      original: "fatherly (adj)",
      translation: "אֲבָהִי",
    },
    {
      _id: "654d805e7abb06097d8a7e5b",
      original: "grandfather (n)",
      translation: "סַבָּא",
    },
    {
      _id: "654d805e7abb06097d8a7e5c",
      original: "grandfather clock (coll)",
      translation: "שְׁעוֹן אוֹרְלוֹגִין/מְטֻטֶּלֶת",
    },
    {
      _id: "654d80677abb06097d8a7eb1",
      original: "great grandfather (coll)",
      translation: "סַבָּא רַבָּא",
    },
    {
      _id: "654d82abf52db6c1ab136908",
      original: "like father like son (idm)",
      translation: "הַתַּפּוּחַ אֵינוֹ נוֹפֵל רָחוֹק מֵהָעֵץ",
    },
  ];

  // Check if translations exist, if not, return null
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div 
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100vh",
      backgroundColor: "#21213E",
    }}>
      {data.map((wordObject) => (
        <Paper
          key={wordObject._id}
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
            {wordObject.original}
          </Typography>
          <Typography variant="subtitle1">{wordObject.translation}</Typography>
        </Paper>
      ))}
    </div>
  );
};

export default TranslationResult;
