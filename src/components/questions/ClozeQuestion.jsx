import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  addClozeQuestion,
  fetchClozeQuestions
} from "../../slices/clozeQuestionSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ClozeQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [userText, setUserText] = useState("");
  const [options, setOptions] = useState([]);
  const [editingOption, setEditingOption] = useState(null);
  const [editedOption, setEditedOption] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const handleAddQuestion = () => {
    if (userText && options.length) {
      dispatch(
        addClozeQuestion({
          questionType: "cloze",
          question: questionText,
          answer: userText,
          options
        })
      );
      setQuestionText("");
      setUserText("");
      setOptions([]);
      setEditedOption("");
      setEditingOption(null);
    } else {
      toast.error("Question and options are required");
    }
  };

  useEffect(() => {
    dispatch(fetchClozeQuestions());
  }, [dispatch]);

  const handleUnderlineText = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      setUserText((prevUserText) => {
        const underlinedText = `<span class="underlined">${selectedText}</span>`;
        const replacedText = prevUserText.replace(selectedText, underlinedText);
        return replacedText;
      });
      setOptions((prevOptions) => [...prevOptions, selectedText]);
    }
  };

  const handleOptionCheck = (option) => {
    setOptions((prevOptions) => prevOptions.filter((opt) => opt !== option));
    setUserText((prevUserText) =>
      prevUserText.replace(`<span class="underlined">${option}</span>`, option)
    );
  };

  const handleOptionEdit = (option) => {
    setEditingOption(option);
    setEditedOption(option);
  };

  const handleEditOption = () => {
    if (editedOption) {
      const updatedOptions = options.map((opt) =>
        opt === editingOption ? editedOption : opt
      );
      setOptions(updatedOptions);
      setUserText((prevUserText) => {
        const replacedText = prevUserText.replace(editingOption, editedOption);
        return replacedText;
      });
      setEditingOption(null);
    }
  };

  const handleAddOption = () => {
    if (inputRef.current.value) {
      const newOption = inputRef.current.value;
      setOptions((prevOptions) => [...prevOptions, newOption]);
      inputRef.current.value = "";
    } else {
      toast.error("Option is required");
    }
  };

  const generatePreview = () => {
    let preview = userText;
    options.forEach((option) => {
      preview = preview.replace(
        `<span class="underlined">${option}</span>`,
        "__________"
      );
    });
    return (
      <div
        className="preview-box bg-white border border-gray-300 rounded-md p-4"
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOptions(items);
  };

  return (
    <div className="p-6 max-w-4xl w-3/5 mx-auto rounded-lg mt-10 shadow-xl shadow-stone bg-gray-100">
      <h2 className="font-thin border rounded w-fit px-4 py-1 bg-slate-700 text-white mb-8">
        Cloze
      </h2>
      <p className="text-slate-700 mb-0">Question Statement:</p>
      <div className="input-box my-4 flex  w-fit">
        <div
          contentEditable
          onInput={(e) => {
            setUserText(e.currentTarget.innerHTML);
            setQuestionText(e.currentTarget.innerText);
          }}
          className="input-word bg-transparent border border-gray-300 w-60 overflow-auto flex-grow-0 text-left flex items-center p-2"
          placeholder="Question"
        />
        <button
          onClick={handleUnderlineText}
          className="bg-slate-900 text-white rounded-md  p-2.5  ml-4"
        >
          Underline
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="options">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {options.map((option, index) => (
                <Draggable key={option} draggableId={option} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="option flex items-center justify-between mb-2 w-40 border border-slate-400 rounded-md p-2"
                    >
                      <i className="fa-solid fa-grip-vertical"></i>
                      {editingOption === option ? (
                        <div>
                          <input
                            type="text"
                            value={editedOption}
                            onChange={(e) => setEditedOption(e.target.value)}
                          />
                          <button onClick={handleEditOption}>Save</button>
                        </div>
                      ) : (
                        <span onClick={() => handleOptionEdit(option)}>
                          {option}
                        </span>
                      )}
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => handleOptionCheck(option)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="add-option-box flex space-x-2 my-6">
        <input
          type="text"
          ref={inputRef}
          placeholder="New Option"
          className="border border-gray-300 rounded-md p-2 w-60"
        />
        <button
          onClick={handleAddOption}
          className="bg-slate-900 text-white rounded-md  p-2.5  ml-8"
        >
          Add Option
        </button>
      </div>

      <p className="text-slate-700 mb-0">Preview:</p>
      {generatePreview()}

      <button
        className=" text-white rounded px-2.5 py-2 ml-0 mt-6 bg-blue-500 shadow-lg hover:shadow-indigo-500/40 hover:scale-105 duration-300"
        onClick={() => {
          handleAddQuestion();
        }}
      >
        Add Question
      </button>
    </div>
  );
};

export default ClozeQuestion;
