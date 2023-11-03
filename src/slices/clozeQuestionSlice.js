import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  questions: [],
  error: null,
  status: "idle"
};

export const fetchClozeQuestions = createAsyncThunk(
  "clozeQuestions/fetchClozeQuestions",
  async () => {
    try {
      const response = await fetch(
        "https://form-builder-app.omkarpatil20.repl.co/ClozeQuestions"
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addClozeQuestion = createAsyncThunk(
  "clozeQuestions/addClozeQuestion",
  async (data) => {
    try {
      const response = await fetch(
        "https://form-builder-app.omkarpatil20.repl.co/ClozeQuestions",
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

export const updateClozeQuestion = createAsyncThunk(
  "clozeQuestions/updateClozeQuestion",
  async ({ _id, newQuestion }) => {
    try {
      const response = await fetch(
        `https://form-builder-app.omkarpatil20.repl.co/ClozeQuestions/${_id}`,
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

export const deleteClozeQuestion = createAsyncThunk(
  "clozeQuestions/deleteClozeQuestion",
  async (id) => {
    try {
      const response = await fetch(
        `https://form-builder-app.omkarpatil20.repl.co/ClozeQuestions/${id}`,
        {
          method: "DELETE"
        }
      );
      const result = await response.json();
      toast.success("Question deleted Successfully");

      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

export const ClozeQuestionslice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClozeQuestions.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchClozeQuestions.fulfilled, (state, action) => {
      state.status = "idle";
      state.questions = action.payload;
      state.error = null;
    });
    builder.addCase(fetchClozeQuestions.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(addClozeQuestion.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addClozeQuestion.fulfilled, (state, action) => {
      state.status = "idle";
      state.questions.push(action.payload);
      state.error = null;
    });
    builder.addCase(addClozeQuestion.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(deleteClozeQuestion.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteClozeQuestion.fulfilled, (state, action) => {
      state.status = "idle";
      state.questions = action.payload;
      state.error = null;
    });
    builder.addCase(deleteClozeQuestion.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
  }
});
