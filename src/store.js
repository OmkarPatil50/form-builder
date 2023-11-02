import { configureStore } from "@reduxjs/toolkit";
import { categorizeQuestionSlice } from "./slices/categorizeQuestionSlice";

export const store = configureStore({
    reducer:{
        categorizeQuestions:categorizeQuestionSlice.reducer
    }
})