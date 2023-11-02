import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategorizeQuestion, fetchCategorizeQuestions } from '../../slices/categorizeQuestionSlice';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";


const CategorizeQuestion = () => {
  const { questions } = useSelector((state) => state.categorizeQuestions);
  const dispatch = useDispatch()

  const [data , setData] = useState({
          questionType:'categorize',
          description:'',
          categories:[
          ]    
  })

  const [categoryInput , setCategoryInput] = useState({
    categoryName:'',
    answers:[]
  })

   const [answerInput , setAnswerInput] = useState({
    categoryName:'all',
    answer:''
  })


  const handleAddQuestion =() =>{
   if(data.categories.length && data.categories.some(({answers})=>answers.length>0)){
dispatch(addCategorizeQuestion(data))
setData({questionType:'categorize',
description:'',
categories:[
]   })

   }else{
    toast.error("Please fill required fields");
   }
  }

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;
console.log(results)
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

      if(type ==='categories-group' ){
        const reorderedCategories = [...data.categories];

        const categorySourceIndex = source.index;
        const categoryDestinationIndex = destination.index;
  
        const [removedDestination] = reorderedCategories.splice(categorySourceIndex, 1);
        reorderedCategories.splice(categoryDestinationIndex, 0, removedDestination);
  
        return setData(()=>{
          return {...data , categories:reorderedCategories}
        });
      }
      
      }

  

  useEffect(()=>{ 
  dispatch(fetchCategorizeQuestions())
  }, [dispatch])

  return (
    <div className="p-6 max-w-4xl w-3/5 mx-auto rounded-lg mt-10 shadow-xl shadow-stone" >
      <DragDropContext onDragEnd={handleDragAndDrop}>
      <header className="mb-4 text-center">
        <h2 className="font-thin border rounded w-fit px-4 py-1 bg-slate-700 text-white">Categorize</h2>
        <label htmlFor="description" className="block mt-4">
          <input
            type="text"
            value={data.description}
            onChange={(event)=>{
              setData(()=>{
                return {...data , description:event.target.value}
              })
            }}
            placeholder="Description (Optional)"
            className="p-2 border rounded-lg w-full focus:outline-none focus:ring focus:border-slate-900"
          />
        </label>
      </header>
      <section className="mt-4">
        <p className='text-slate-700 mb-5'>Categories:</p>
        <Droppable droppableId="CATEGORIES" type="categories-group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {data.categories.map((category, index) => {
            const { categoryName } = category;
            const categoryIndex = index
            return ( <Draggable
              draggableId={`"category${index}"`}
              index={index}
              key={index}
            >
              {(provided) => (
               <div key={categoryName} {...provided.dragHandleProps} {...provided.draggableProps} className="flex items-center justify-between mb-2 w-40 border border-slate-400 rounded-md px-2 py-0 " ref={provided.innerRef}>
                <i className="fa-solid fa-grip-vertical"></i>
               <p className="text-gray-700 mr-5 flex items-center justify-center">{categoryName}</p>
               <button className="bg-transparent text-slate-900 rounded-full p-2 hover:opacity-60" onClick={()=>{
                 setData(()=>{
                   return {...data , categories:data.categories.filter((_,index)=>index!==categoryIndex)}
                 })
               }}>
                 <i className="fas fa-times"></i>
               </button>
               {provided.placeholder}
             </div>
              )}
            </Draggable>
            );
          })
        }
         {provided.placeholder}
        </div>
          )}
                </Droppable>
     
        <label htmlFor="category" className="flex items-center justify-flex-end mt-4">
          <input
            type="text"
            value={categoryInput.categoryName}
             onChange={(event)=>{
              setCategoryInput(()=>{
                return {...categoryInput , categoryName:event.target.value}
              })
            }}
            placeholder="Add Category Name"
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:border-slate-900"
          />
          <button className="bg-slate-900 text-white rounded-full w-14 p-2.5  ml-4" onClick={()=>{
             if(categoryInput.categoryName.length){
              setData(()=>{
                return {...data , categories:[...data.categories , categoryInput]}
              })
              setCategoryInput({categoryName:'',
              answers:[]})
             }else{
              toast.error("Category Name is required");
             }
            }}>
            <i className="fas fa-plus"></i>
          </button>
        </label>
      </section>
      </DragDropContext>
      <section className="my-10">
      <p className='text-slate-700 mb-5'>Answers:</p>
      
               
                <table className='w-full border border-slate-400 rounded-md' >
             <thead>
             <tr>
                 <th className='border border-slate-400 rounded-md px-2 py-1'>Item</th>
                 <th className='border border-slate-400 rounded-md px-2 py-1'>Belongs to</th>   
                 <th className='border border-slate-400 rounded-md px-2 py-1'>Delete</th>   
               </tr>
             </thead>
               
             <tbody >
               {data.categories.map((category , index) => {
                const categoryIndex = index
                  const { categoryName, answers } = category;
                return answers.map((answer, index) => {
                    const answerIndex = index
                    return ( 
                    
                     
                       <tr 
                       className='mb-10 '
                       >
                       <td>
                         <p className='className="text-gray-700 p-2 w-full overflow-auto flex justify-center items-center border border-slate-400 rounded-md "'>
                           
               {answer}
                         </p>
                       </td>
                       <td >
                       <select
                 name="categoryName"
                 value={categoryName}
                 className="p-2 border rounded-lg focus:outline-none focus:ring focus:border-slate-900 cursor-pointer flex justify-center items-center w-full"
                 onChange={event=>{
                   setData(()=>{
                     return {...data , categories:data.categories.reduce(((acc,curr)=>{
                       return categoryName === curr.categoryName?acc=[...acc , {...curr , answers:curr.answers.filter(ele=>ele!==answer)}]:[...acc , curr]
                      }),[]).reduce(((acc,curr)=>{
                      return event.target.value === curr.categoryName?acc=[...acc , {...curr , answers:[...curr.answers , answer]}]:[...acc , curr]
                     }),[])}
                   })
                 }}
               >
                 {data.categories.map((c) => {
                     const { categoryName } = c;
                     return (
                       <option key={categoryName} value={categoryName}>
                         {categoryName}
                       </option>
                     );
                   })
               }
               </select>
                       </td>
                       <td className='border border-slate-400 rounded-md'>
                       <button className="bg-transparent text-slate-900 rounded-full p-2 hover:opacity-60 flex justify-center items-center w-full " onClick={()=>{
                 setData(()=>{
                 return {...data , categories:data.categories.reduce(((acc,curr)=>{
                   return data.categories.indexOf(curr) === categoryIndex ? [...acc , {...curr, answers:curr.answers.filter((_,index)=>index!==answerIndex)}] :[...acc ,curr]
                 }),[])}
               })
               }}>
                 <i className="fas fa-times"></i>
               </button>
                       </td>
                 </tr>
                     )}
                       
                    )
                  }
                  )       
                }
              
              
             </tbody>
            
               
            
   
       </table>
               
            

        
        <label htmlFor="answer" className="flex items-center justify-flex-start mt-4 ml-2">
          <input
            type="text"
            value={answerInput.answer}
            placeholder="Add Answer"
            className="p-2 border rounded-lg w-48  focus:outline-none focus:ring focus:border-slate-900"
            onChange={(event)=>{
              setAnswerInput(()=>{
                return {...answerInput , answer:event.target.value}
              })
            }}
          />
          <select name="answer" value={answerInput.categoryName} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-slate-900 mx-10 cursor-pointer"  onChange={(event)=>{
              setAnswerInput(()=>{
                return {...answerInput , categoryName:event.target.value}
              })
            }}>
              <option value='all'>
                    All
                  </option>
            {data.categories.map((category) => {
                const { categoryName } = category;
                
                return (
                  <option key={categoryName} value={categoryName}>
                    {categoryName}
                  </option>
                );
              })
            }
          
          </select>
          <button className="bg-slate-900 text-white rounded-full w-14 p-2.5 "  onClick={()=>{
             if(answerInput.categoryName !== 'all' && answerInput.answer.length){
               setData(()=>{
                return {...data , categories:data.categories.reduce(((acc,curr)=>{
                 return answerInput.categoryName === curr.categoryName?acc=[...acc , {...curr , answers:[...curr.answers , answerInput.answer]}]:[...acc , curr]
                }),[])}
              })
              setAnswerInput({categoryName:'all',
              answer:''})
             }else{
              toast.error("Answer and Category are required");
             }
            }}>
            <i className="fas fa-plus"></i>
          </button>
        </label>
      </section>
      <button className=" text-white rounded px-2.5 py-2 ml-4 bg-blue-500 shadow-lg hover:shadow-indigo-500/40 hover:scale-105 duration-300" onClick={()=>{
        handleAddQuestion()
      }}>Add Question</button>

      
     
    </div>
  );
};

export default CategorizeQuestion;
