import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { deleteClozeQuestion } from "../../slices/clozeQuestionSlice";
import { useLocation } from "react-router-dom";

const ClozeQuestionRenderer = ({ question }) => {
  const [draggedOptions, setDraggedOptions] = useState([...question.options]);
  const [clozeAnswer, setClozeAnswer] = useState(question.answer);

  const dispatch = useDispatch();
  const location = useLocation();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const parts = clozeAnswer.split(/(<span class="underlined">.*?<\/span>)/g);

    const updatedDraggedOptions = [...draggedOptions];
    const [draggedOption] = updatedDraggedOptions.splice(sourceIndex, 1);
    updatedDraggedOptions.splice(destIndex, 0, draggedOption);
    setDraggedOptions(updatedDraggedOptions);

    parts[parseFloat(result.destination.droppableId)] = result.draggableId;

    const newAnswer = parts.join("");

    setClozeAnswer(newAnswer);
  };

  const renderAnswer = () => {
    const parts = clozeAnswer.split(/(<span class="underlined">.*?<\/span>)/g);

    return (
      <div className="flex justify-center items-center">
        {parts.map((part, index) => {
          if (part.startsWith('<span class="underlined">')) {
            return (
              <Droppable
                key={index}
                droppableId={index.toString()}
                direction="horizontal"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="p-2 m-2 w-24 h-8 bg-blue-200 rounded cursor-pointer"
                  >
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          } else {
            return <span key={index}>{part}</span>;
          }
        })}
      </div>
    );
  };

  const onDelete = () => {
    dispatch(deleteClozeQuestion(question._id));
  };

  return (
    <div>
      {question ? (
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
            Cloze
          </h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex justify-center items-center mb-4">
              <Droppable droppableId="options" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex space-x-2"
                  >
                    {draggedOptions.map((option, index) => (
                      <Draggable
                        key={option}
                        draggableId={option}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 m-2 bg-blue-200 rounded cursor-pointer"
                          >
                            {option}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </div>

            {renderAnswer()}
          </DragDropContext>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ClozeQuestionRenderer;
