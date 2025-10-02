 import React from 'react'
import {useState,useEffect, useContext} from "react"
import {TasksContext} from "../context/TasksContext"


const FetchData = ({updateTask, deleteTask}) => {

      const {title, setTitle, description, setDescription, priority, setPriority, dueDate, setDueDate,data, setData, refresh} = useContext(TasksContext)
    

        useEffect(() => {
          const fetchData = async () => {
            const response = await fetch("http://localhost:8000/tasks")
            const data = await response.json()
            setData(data)
          };
    
          fetchData();
    
        } , [ refresh]);
  return (
    <>
    {data.map((task)=> {
      return (
        <div key={task._id} className="border p-4 m-4 ">
          <h1>{task.title}</h1>
          <h1>{task.description}</h1>
          <h1>{task.completed ? "Yes" : "No"}</h1>
          <h1>{task.priority}</h1>
          <h1>{task.dueDate}</h1>
          <button
            onClick={() => updateTask(task._id, task.completed)}
            className="bg-[#6D94C5] px-2 h-10 rounded-md text-white cursor-pointer"
            type="submit"
          >
            Mark Complete
          </button>
          <button
            onClick={() => deleteTask(task._id)}
            className="bg-[#6D94C5] px-2 h-10 rounded-md text-white cursor-pointer ml-2"
            type="submit"
          >
            Delete
          </button>
        </div>
      );

    } 
       
       
    )}
   
    </>
  );
}

export default FetchData