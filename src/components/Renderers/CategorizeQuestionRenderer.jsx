import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { deleteCategorizeQuestion } from "../../slices/categorizeQuestionSlice";
import { useLocation } from "react-router-dom";

const CategorizeQuestion = ({ question }) => {
  const { categories } = question;
  const dispatch = useDispatch();
  const location = useLocation();

  const initialCategoryData = categories.reduce(
    (acc, category) => ({
      ...acc,
      [category.categoryName]: {
        categoryName: category.categoryName,
        answers: []
      }
    }),
    {}
  );

  const [categoryData, setCategoryData] = useState(initialCategoryData);
  const [mainListAnswers, setMainListAnswers] = useState(
    categories.reduce((acc, category) => acc.concat(category.answers), [])
  );

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const sourceIndex = source.index;

    const movedAnswer = mainListAnswers[sourceIndex];
    const updatedMainListAnswers = [...mainListAnswers];
    updatedMainListAnswers.splice(sourceIndex, 1);

    setMainListAnswers(updatedMainListAnswers);

    const sourceCategoryName = source.droppableId;
    const destinationCategoryName = destination.droppableId;

    if (sourceCategoryName !== destinationCategoryName) {
      const updatedCategoryData = { ...categoryData };

      if (updatedCategoryData[destinationCategoryName]) {
        updatedCategoryData[destinationCategoryName].answers.push(movedAnswer);
      }

      setCategoryData(updatedCategoryData);
    }
  };

  const onDelete = () => {
    dispatch(deleteCategorizeQuestion(question._id));
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
        Categorize
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col">
          <Droppable droppableId="answers" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex bg-lightgrey p-4 min-h-32"
              >
                <h2 className="text-xl font-bold block">Answers</h2>
                {mainListAnswers.map((answer, index) => (
                  <Draggable key={answer} draggableId={answer} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mt-10 ml-4 bg-blue-500 text-white  rounded cursor-pointer "
                      >
                        {answer}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="w-full flex flex-wrap">
            {Object.values(categoryData).map((category, categoryIndex) => (
              <Droppable
                key={category.categoryName}
                droppableId={category.categoryName}
                direction="vertical"
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-slate-200 p-4 h-80 w-80 m-5 "
                  >
                    <h2 className="text-xl font-bold">
                      {category.categoryName}
                    </h2>
                    {category.answers.map((answer, index) => (
                      <Draggable
                        key={answer}
                        draggableId={answer}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 m-2 border border-gray-300 rounded cursor-pointer"
                          >
                            {answer}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default CategorizeQuestion;
