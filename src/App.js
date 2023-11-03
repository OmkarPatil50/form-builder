import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import CategorizeQuestion from "./components/questions/CategorizeQuestion";
import ClozeQuestion from "./components/questions/ClozeQuestion";
import MCQQuestionBuilder from "./components/questions/mcqQuestion";
import FormRenderPage from "./Pages/FormRenderPage/FormRenderPage";
import { useSelector } from "react-redux";
import { Loader } from "./components/Loader/Loader";
import TestPage from "./Pages/TestPage/TestPage";

function App() {
  const categorizeQuestions = useSelector((state) => state.categorizeQuestions);
  const clozeQuestions = useSelector((state) => state.clozeQuestions);
  const mcqQuestions = useSelector((state) => state.mcqQuestions);
  return (
    <div className="App">
      {categorizeQuestions.status === "loading" ||
      clozeQuestions.status === "loading" ||
      mcqQuestions.status === "loading" ? (
        <Loader />
      ) : (
        ""
      )}
      <Navbar />
      <Routes>
        <Route path="/add/categorize" element={<CategorizeQuestion />} />
        <Route path="/add/cloze" element={<ClozeQuestion />} />
        <Route path="/add/mcq" element={<MCQQuestionBuilder />} />
        <Route path="/" element={<FormRenderPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff"
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black"
            }
          }
        }}
      />
    </div>
  );
}

export default App;
