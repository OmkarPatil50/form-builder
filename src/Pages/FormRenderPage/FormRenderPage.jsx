import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategorizeQuestions } from "../../slices/categorizeQuestionSlice";
import { fetchMcqQuestions } from "../../slices/mcqQuestionSlice";
import { fetchClozeQuestions } from "../../slices/clozeQuestionSlice";
import { useSelector } from "react-redux";
import CategorizeQuestionRenderer from "../../components/Renderers/CategorizeQuestionRenderer";
import ClozeQuestionRenderer from "../../components/Renderers/ClozeQuestionRenderer";
import ComprehensionQuestionRenderer from "../../components/Renderers/ComprehensionQuestionRenderer";

const FormRenderPage = () => {
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
    <div>
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
          Add Some Questions to Preview
        </h1>
      ) : (
        ""
      )}
    </div>
  );
};

export default FormRenderPage;
