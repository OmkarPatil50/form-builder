import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  questions: [],
  error: null,
  status: "idle"
};

export const fetchCategorizeQuestions = createAsyncThunk(
  "categorizeQuestions/fetchCategorizeQuestions",
  async () => {
    try {
      const response = await fetch(
        "https://form-builder-app.omkarpatil20.repl.co/categorizeQuestions"
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addCategorizeQuestion = createAsyncThunk(
  "categorizeQuestions/addCategorizeQuestion",
  async (data) => {
    try {
      const response = await fetch(
        "https://form-builder-app.omkarpatil20.repl.co/categorizeQuestions",
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

export const updateCategorizeQuestion = createAsyncThunk(
  "categorizeQuestions/updateCategorizeQuestion",
  async ({ _id, newQuestion }) => {
    try {
      const response = await fetch(
        `https://form-builder-app.omkarpatil20.repl.co/categorizeQuestions/${_id}`,
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

export const deleteCategorizeQuestion = createAsyncThunk(
  "categorizeQuestions/deleteCategorizeQuestion",
  async (id) => {
    try {
      const response = await fetch(
        `https://form-builder-app.omkarpatil20.repl.co/categorizeQuestions/${id}`,
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

export const categorizeQuestionslice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategorizeQuestions.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategorizeQuestions.fulfilled, (state, action) => {
      state.status = "idle";
      state.questions = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCategorizeQuestions.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(addCategorizeQuestion.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addCategorizeQuestion.fulfilled, (state, action) => {
      state.status = "idle";
      state.questions.push(action.payload);
      state.error = null;
    });
    builder.addCase(addCategorizeQuestion.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(deleteCategorizeQuestion.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteCategorizeQuestion.fulfilled, (state, action) => {
      state.status = "idle";
      state.questions = action.payload;
      state.error = null;
    });
    builder.addCase(deleteCategorizeQuestion.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
  }
});
