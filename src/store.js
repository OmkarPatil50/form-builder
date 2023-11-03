import { configureStore } from "@reduxjs/toolkit";
import { categorizeQuestionslice } from "./slices/categorizeQuestionSlice";
import { ClozeQuestionslice } from "./slices/clozeQuestionSlice";
import { McqQuestionslice } from "./slices/mcqQuestionSlice";

export const store = configureStore({
    reducer:{
      categorizeQuestions: categorizeQuestionslice.reducer,
      clozeQuestions:ClozeQuestionslice.reducer,
      mcqQuestions:McqQuestionslice.reducer
    }
})