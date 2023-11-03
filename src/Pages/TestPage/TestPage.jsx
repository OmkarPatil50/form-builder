import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategorizeQuestions } from "../../slices/categorizeQuestionSlice";
import { fetchMcqQuestions } from "../../slices/mcqQuestionSlice";
import { fetchClozeQuestions } from "../../slices/clozeQuestionSlice";
import { useSelector } from "react-redux";
import CategorizeQuestionRenderer from "../../components/Renderers/CategorizeQuestionRenderer";
import ClozeQuestionRenderer from "../../components/Renderers/ClozeQuestionRenderer";
import ComprehensionQuestionRenderer from "../../components/Renderers/ComprehensionQuestionRenderer";
import toast from "react-hot-toast";

const TestPage = () => {
  const categorizeQuestions = useSelector((state) => state.categorizeQuestions);
  const clozeQuestions = useSelector((state) => state.clozeQuestions);
  const mcqQuestions = useSelector((state) => state.mcqQuestions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategorizeQuestions());
    dispatch(fetchMcqQuestions());
    dispatch(fetchClozeQuestions());
  }, []);

  return (
    <div className="flex flex-col ">
      {categorizeQuestions.questions.map((question) => {
        return <CategorizeQuestionRenderer question={question} />;
      })}
      {clozeQuestions.questions.map((question) => {
        return <ClozeQuestionRenderer question={question} />;
      })}
      {mcqQuestions.questions.map((question) => {
        return <ComprehensionQuestionRenderer question={question} />;
      })}
      {!categorizeQuestions.questions.length &&
      !clozeQuestions.questions.length &&
      !mcqQuestions.questions.length ? (
        <h1 className="flex items-center justify-center w-screen h-screen box-sizing: border-box m-0 p-0 fixed text-2xl">
          No Questions to test
        </h1>
      ) : (
        <button
          onClick={() => {
            toast.success("Test Submitted Successfully");
          }}
          className="w-40 self-center text-white rounded px-2.5 py-2 mt-10 mb-20 mx-auto bg-blue-500 shadow-lg hover:shadow-indigo-500/40 hover:scale-105 duration-300"
        >
          Submit Test
        </button>
      )}
    </div>
  );
};

export default TestPage;
