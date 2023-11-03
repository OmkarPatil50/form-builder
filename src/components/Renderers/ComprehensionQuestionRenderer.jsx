import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMcqQuestion } from "../../slices/mcqQuestionSlice";
import { useLocation } from "react-router-dom";

const Question = ({ question, onAnswerSelected, questionNumber }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onAnswerSelected(event.target.value);
  };

  return (
    <div className="mb-4">
      <p className="mb-2 font-semibold">
        Q.{questionNumber} {question.question}
      </p>
      <div>
        {question.options.map((option, index) => (
          <label key={index} className="block mb-2">
            <input
              type="radio"
              name={`question-${question._id}`}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="mr-2 cursor-pointer"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

const ComprehensionQuestionRenderer = ({ question }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();

  const handleAnswerSelected = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption
    }));
  };

  const onDelete = () => {
    dispatch(deleteMcqQuestion(question._id));
  };

  return (
    <div className="p-6 max-w-4xl w-3/5 mx-auto rounded-lg mt-10 shadow-xl shadow-stone bg-gray-100 relative">
      {location.pathname === "/" ? (
        <button
          onClick={onDelete}
          className="absolute top-0 right-0 bg-red-500 text-white m-4 px-2 py-1 rounded-full hover:bg-red-600 transition duration-200"
        >
          <i className="fas fa-trash"></i>
        </button>
      ) : (
        ""
      )}
      <h2 className="font-thin border rounded w-fit px-4 py-1 bg-slate-700 text-white mb-8">
        Comprehension
      </h2>
      <h2 className="text-xl font-semibold mb-4 p-5 border border-slate-700 rounded">
        {question.comprehension}
      </h2>
      <form>
        {question.questions.map((question, index) => (
          <Question
            key={index}
            questionNumber={index + 1}
            question={question}
            onAnswerSelected={(selectedOption) =>
              handleAnswerSelected(index, selectedOption)
            }
          />
        ))}
      </form>
      <div>
        <button
          onClick={() => {
            console.log("User Answers:", userAnswers);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ComprehensionQuestionRenderer;
