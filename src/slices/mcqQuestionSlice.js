import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  questions: [],
  error: null,
  status: "idle"
};

export const fetchMcqQuestions = createAsyncThunk(
  "mcqQuestions/fetchMcqQuestions",
  async () => {
    try {
      const response = await fetch(
        "https://form-builder-app.omkarpatil20.repl.co/mcqQuestions"
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addMcqQuestion = createAsyncThunk(
  "mcqQuestions/addMcqQuestion",
  async (data) => {
    try {
      const response = await fetch(
        "https://form-builder-app.omkarpatil20.repl.co/mcqQuestions",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const result = await response.json();
      toast.success("Question added Successfully");
      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateMcqQuestion = createAsyncThunk(
  "mcqQuestions/updateMcqQuestion",
  async ({ _id, newQuestion }) => {
    try {
      const response = await fetch(
        `https://form-builder-app.omkarpatil20.repl.co/mcqQuestions/${_id}`,
        {
          method: "PUT",
          body: JSON.stringify(newQuestion),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const result = await response.json();
      toast.success("Question updated Successfully");

      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteMcqQuestion = createAsyncThunk(
  "mcqQuestions/deleteMcqQuestion",
  async (id) => {
    try {
      const response = await fetch(
        `https://form-builder-app.omkarpatil20.repl.co/mcqQuestions/${id}`,
        {
          method: "DELETE"
        }
      );
      const result = await response.json();
      toast.success("Question Deleted Successfully");

      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

export const McqQuestionslice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMcqQuestions.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMcqQuestions.fulfilled, (state, action) => {
      state.status = "idle";
      state.questions = action.payload;
      state.error = null;
    });
    builder.addCase(fetchMcqQuestions.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(addMcqQuestion.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addMcqQuestion.fulfilled, (state, action) => {
      state.status = "idle";
      state.questions.push(action.payload);
      state.error = null;
    });
    builder.addCase(addMcqQuestion.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(deleteMcqQuestion.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteMcqQuestion.fulfilled, (state, action) => {
      state.status = "idle";
      state.questions = action.payload;
      state.error = null;
    });
    builder.addCase(deleteMcqQuestion.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
  }
});
