import mongoose from "mongoose";

const dictionary = new mongoose.Schema({
    original: String, // Language code (e.g., "en" for English, "es" for Spanish)
    translation: String,
}, {
    maxTimeMS: 60000, // Set to 60 seconds (adjust as needed)
});

export const Dictionary = mongoose.model('En_To_Heb', dictionary, 'En_To_Heb');
