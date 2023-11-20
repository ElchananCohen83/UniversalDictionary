import mongoose from "mongoose";

const dictionary = new mongoose.Schema({
    original: String, // Language code (e.g., "en" for English, "es" for Spanish)
    trns: String,
}, {
    maxTimeMS: 60000, // Set to 60 seconds (adjust as needed)
});

function model(collection) {
    return mongoose.model(collection, dictionary, collection);
}

export {model}