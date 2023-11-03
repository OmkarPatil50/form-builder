import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  addMcqQuestion,
  fetchMcqQuestions
} from "../../slices/mcqQuestionSlice";
import toast from "react-hot-toast";

function MCQQuestionBuilder() {
  const [comprehension, setComprehension] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [editOptionIndex, setEditOptionIndex] = useState({
    questionIndex: -1,
    optionIndex: -1
  });
  const [editOptionText, setEditOptionText] = useState("");
  const [editQuestionIndex, setEditQuestionIndex] = useState(-1);
  const [editQuestionText, setEditQuestionText] = useState("");

  const dispatch = useDispatch();

  const handleComprehensionChange = (e) => {
    setComprehension(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOptionInput(e.target.value);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const addOption = () => {
    if (optionInput) {
      setCurrentOptions([...currentOptions, optionInput]);
      setOptionInput("");
    } else {
      toast.error("Option is required");
    }
  };

  const handleOptionEditChange = (e) => {
    setEditOptionText(e.target.value);
  };

  const addQuestion = () => {
    if (currentQuestion && currentOptions.length) {
      setQuestions([
        ...questions,
        {
          question: currentQuestion,
          options: currentOptions,
          correctAnswer
        }
      ]);
      setCurrentQuestion("");
      setCurrentOptions([]);
      setCorrectAnswer("");
    }
  };

  const editOption = (questionIndex, optionIndex) => {
    setEditOptionIndex({ questionIndex, optionIndex });
    setEditOptionText(questions[questionIndex].options[optionIndex]);
  };

  const saveOptionEdit = () => {
    const updatedOptions = [
      ...questions[editOptionIndex.questionIndex].options
    ];
    updatedOptions[editOptionIndex.optionIndex] = editOptionText;
    const updatedQuestions = [...questions];
    updatedQuestions[editOptionIndex.questionIndex].options = updatedOptions;
    setQuestions(updatedQuestions);
    setEditOptionIndex({ questionIndex: -1, optionIndex: -1 });
    setEditOptionText("");
  };

  const editQuestion = (questionIndex) => {
    setEditQuestionIndex(questionIndex);
    setEditQuestionText(questions[questionIndex].question);
  };

  const saveQuestionEdit = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[editQuestionIndex].question = editQuestionText;
    setQuestions(updatedQuestions);
    setEditQuestionIndex(-1);
    setEditQuestionText("");
  };

  const deleteQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.type === "QUESTION") {
      const reorderedQuestions = Array.from(questions);
      const [reorderedQuestion] = reorderedQuestions.splice(
        result.source.index,
        1
      );
      reorderedQuestions.splice(result.destination.index, 0, reorderedQuestion);

      setQuestions(reorderedQuestions);
    } else if (result.type === "OPTION") {
      const sourceIds = result.source.droppableId.split("-");
      const destinationIds = result.destination.droppableId.split("-");
      const sourceQuestionIndex = parseInt(sourceIds[1]);
      const destinationQuestionIndex = parseInt(destinationIds[1]);

      if (sourceQuestionIndex === destinationQuestionIndex) {
        const questionIndex = sourceQuestionIndex;
        const reorderedOptions = Array.from(questions[questionIndex].options);
        const [reorderedOption] = reorderedOptions.splice(
          result.source.index,
          1
        );
        reorderedOptions.splice(result.destination.index, 0, reorderedOption);

        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options = reorderedOptions;
        setQuestions(updatedQuestions);
      }
    }
  };

  const handleSubmit = () => {
    if (comprehension.length && questions.length) {
      dispatch(
        addMcqQuestion({
          comprehension,
          questions
        })
      );
      setComprehension("");
      setQuestions([]);
    } else {
      toast.error("Comprehension, Questions adn correct answer are required");
    }
  };

  useEffect(() => {
    dispatch(fetchMcqQuestions());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-4xl w-3/5 mx-auto rounded-lg mt-10 shadow-xl shadow-stone bg-gray-100">
      <h2 className="font-thin border rounded w-fit px-4 py-1 bg-slate-700 text-white mb-5 ml-0">
        Comprehension
      </h2>
      <p className="text-slate-700 mb-5">Comprehension:</p>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Write Comprehension here"
        value={comprehension}
        onChange={handleComprehensionChange}
      />
      <div className="mt-4">
        {editQuestionIndex !== -1 ? (
          <div>
            <input
              className="w-full p-2 border rounded"
              value={editQuestionText}
              onChange={(e) => setEditQuestionText(e.target.value)}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={saveQuestionEdit}
            >
              Save Question
            </button>
          </div>
        ) : (
          <div className="m-0">
            <p className="text-slate-700 mb-2 ml-1">Question:</p>
            <input
              className="w-full p-2 border rounded mb-4"
              placeholder="Question"
              value={currentQuestion}
              onChange={handleQuestionChange}
            />
          </div>
        )}
        <div className="mt-2 flex flex-col">
          {currentOptions.map((option, index) => {
            const optionIndex = index;
            return (
              <div
                key={index}
                className="flex items-center justify-between overflow-auto mb-2 w-48 border border-slate-400 rounded-md px-2 py-1"
              >
                <p>
                  {index + 1}. {option}
                </p>
                <button
                  className="bg-transparent text-slate-900 rounded-full p-2 hover:opacity-60"
                  onClick={() => {
                    setCurrentOptions(() => {
                      return currentOptions.filter(
                        (_, index) => index !== optionIndex
                      );
                    });
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-slate-700 mb-2 ml-1">Option:</p>
        <div className="flex items-center justify-center mb-4">
          <input
            className="w-full p-2 border rounded mr-10"
            placeholder="Option"
            value={optionInput}
            onChange={handleOptionChange}
          />
          <button
            className="bg-slate-900 text-white rounded-md text-sm px-4 py-2 m "
            onClick={addOption}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <p className="text-slate-700 mb-2 ml-1">Correct Answer:</p>
        <select
          name="correct-answer"
          onChange={handleCorrectAnswerChange}
          className="flex items-center justify-between overflow-auto mb-4 w-48 border border-slate-400 rounded-md px-2 py-1"
        >
          <option value="all">Select Correct Option</option>
          {currentOptions.map((option, index) => {
            return (
              <option key={index} value={option}>
                <p>
                  {index + 1}. {option}
                </p>
              </option>
            );
          })}
        </select>
        {editQuestionIndex === -1 ? (
          <button
            className="p-2 bg-slate-900 text-white rounded"
            onClick={() => {
              if (
                correctAnswer &&
                comprehension.length &&
                currentQuestion.length &&
                currentOptions.length
              ) {
                addQuestion();
              } else {
                toast.error(
                  "Comprehension, Question, Options and correct answer are required"
                );
              }
            }}
          >
            Add Question
          </button>
        ) : null}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Questions:</h2>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="questions" type="QUESTION">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questions.map((q, questionIndex) => (
                  <Draggable
                    key={questionIndex}
                    draggableId={`question-${questionIndex}`}
                    index={questionIndex}
                  >
                    {(provided) => (
                      <div {...provided.draggableProps} ref={provided.innerRef}>
                        {editQuestionIndex === questionIndex ? (
                          <div className="flex items-center justify-between overflow-auto mb-2 w-[50%] px-2 py-1">
                            <input
                              className="w-full px-2 py-2 border border-slate-400 rounded-md mr-4"
                              value={editQuestionText}
                              onChange={(e) =>
                                setEditQuestionText(e.target.value)
                              }
                            />
                            <button
                              className="px-2 py-2 bg-blue-500 text-white rounded"
                              onClick={saveQuestionEdit}
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between overflow-auto mb-2 w-full px-2 py-1r">
                            <div className="font-semibold border border-slate-400 rounded-md w-[50%] p-2">
                              Q.{questionIndex + 1} {q.question}
                            </div>
                            <div>
                              <button
                                className="ml-2 p-2 bg-transparent text-blue-500"
                                onClick={() => editQuestion(questionIndex)}
                              >
                                <i className="fas fa-pencil"></i>
                              </button>
                              <button
                                className="ml-2 p-2 bg-transparent text-red-500"
                                onClick={() => deleteQuestion(questionIndex)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        )}
                        <ul className="mt-2">
                          <Droppable
                            droppableId={`options-${questionIndex}`}
                            type="OPTION"
                          >
                            {(provided) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {q.options.map((option, optionIndex) => (
                                  <Draggable
                                    key={optionIndex}
                                    draggableId={`option-${questionIndex}-${optionIndex}`}
                                    index={optionIndex}
                                  >
                                    {(provided) => (
                                      <li
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        className="flex items-center"
                                      >
                                        {editOptionIndex.questionIndex ===
                                          questionIndex &&
                                        editOptionIndex.optionIndex ===
                                          optionIndex ? (
                                          <div className="ml-2 border border-slate-400 rounded-md w-[50%] p-2 flex items-center justify-between">
                                            <input
                                              className="p-2 border rounded w-full"
                                              value={editOptionText}
                                              onChange={handleOptionEditChange}
                                            />
                                            <button
                                              className="p-2 bg-blue-500 text-white rounded"
                                              onClick={saveOptionEdit}
                                            >
                                              Save
                                            </button>
                                          </div>
                                        ) : (
                                          <p className=" ml-1 w-[50%] p-2">
                                            {optionIndex + 1}. {option}
                                          </p>
                                        )}
                                        <button
                                          className="ml-2 p-2 bg-transparent text-blue-500 "
                                          onClick={() =>
                                            editOption(
                                              questionIndex,
                                              optionIndex
                                            )
                                          }
                                        >
                                          <i className="fas fa-pencil"></i>
                                        </button>
                                      </li>
                                    )}
                                  </Draggable>
                                ))}
                              </div>
                            )}
                          </Droppable>
                        </ul>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit Comprehension
      </button>
    </div>
  );
}

export default MCQQuestionBuilder;
