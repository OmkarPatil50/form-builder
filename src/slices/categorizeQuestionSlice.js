import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    questions:[
        // { 
        //     questionType:'categorize',
        //     categories:[
        //       {
        //         categoryName:'cat1',
        //         answers:['ans1' , 'ans3']
        //       },
        //       {
        //         categoryName:'cat2',
        //         answers:['ans2' , 'ans4']
        //       }
        
        //     ]
        //   }
    ],
    error:null,
    status:'idle'
}

export const fetchCategorizeQuestions = createAsyncThunk(
    "CategorizeQuestions/fetchCategorizeQuestions",
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
    "CategorizeQuestions/addCategorizeQuestion",
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
        return result;
      } catch (error) {
        console.error(error);
      }
    }
  );
  
  export const updatePatient = createAsyncThunk(
    "CategorizeQuestions/updatePatient",
    async ({ _id, newPatient }) => {
      try {
        const response = await fetch(
          `https://form-builder-app.omkarpatil20.repl.co/categorizeQuestions/${_id}`,
          {
            method: "PUT",
            body: JSON.stringify(newPatient),
            headers: {
              "Content-type": "application/json"
            }
          }
        );
        const result = await response.json();
        return result.CategorizeQuestions;
      } catch (error) {
  
        console.error(error);
      }
    }
  );
  
  export const deletePatient = createAsyncThunk(
    "CategorizeQuestions/deletePatient",
    async (id) => {
      try {
        const response = await fetch(
          `https://form-builder-app.omkarpatil20.repl.co/categorizeQuestions/${id}`,
          {
            method: "DELETE"
          }
        );
        const result = await response.json();
  
        return result.CategorizeQuestions;
      } catch (error) {
        console.error(error);
      }
    }
  );
  

export const categorizeQuestionSlice = createSlice({
    name:'categorizeQuestions',
    initialState ,
    reducers:{},
    extraReducers:builder=>{
builder.addCase(fetchCategorizeQuestions.pending, (state)=>{
state.status ='loading'
})
builder.addCase(fetchCategorizeQuestions.fulfilled, (state, action) => {
    state.status = "idle";
    state.questions = action.payload;
    state.error = null;
  });
  builder.addCase(fetchCategorizeQuestions.rejected, (state, action) => {
    state.status = "idle";
    state.error = action.payload.error;
  });
  builder.addCase(addCategorizeQuestion.pending, (state)=>{
    state.status ='loading'
    })
    builder.addCase(addCategorizeQuestion.fulfilled, (state, action) => {
        console.log('success' , action.payload)
        state.status = "idle";
        state.questions.push(action.payload);
        state.error = null;
      });
      builder.addCase(addCategorizeQuestion.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload.error;
      });
    }
})