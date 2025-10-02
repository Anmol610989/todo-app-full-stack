import React from 'react'
import {useState, useEffect, useContext} from "react"
import {TasksContext} from "../context/TasksContext"
import FetchData from "./FetchData"
import Toaster from './Toaster'


const TaskForm = () => {

  const {title, setTitle, description, setDescription, priority, setPriority,  dueDate, setDueDate,data, setData, setRefresh, refresh} = useContext(TasksContext)

  const [toast, setToast] = useState(null);
  const [type, setType] = useState('');

  // Toast notification for successful task addition

  const createToast = (message, type) => {
    setToast(message);
    setType(type);
    setTimeout(() => {
      setToast("");
    }, 3000);
  };


// Form submission handler
  const handleFormSubmit =  (e) => {
    e.preventDefault();

    if(!title) {
      createToast("Please enter a title", '');
      return;
    }
     
      addTask();
    };
    
    
// Post request to add a new task
    const addTask = async () => {
      try {
        const response = await fetch("http://localhost:8000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // tell server we’re sending JSON
          },
          body: JSON.stringify({
            title: title,
            description: description,
            completed: false,
            dueDate: dueDate,
            priority: priority,
          }),
        });
        const data = await response.json();
        console.log("Task added:", data);
        // Clear form fields after submission
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("low");
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
      setRefresh(prev => !prev); // Toggle refresh to trigger useEffect
      createToast("Task added successfully", 'success');
    };


// Put request to update a task (mark as complete/incomplete)
    const updateTask = async (id, completed) => {
      const updated = !completed;
    //P.S- create a separate pop - up form and add edit button to each task to update other fields

      try {
        const response = await fetch(`http://localhost:8000/tasks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // tell server we’re sending JSON
          },
          body: JSON.stringify({
            completed: updated,
          }),
        });
        const data = await response.json();
        console.log("Task updated:", data);

      } catch (error) {
        console.error("Error updating task:", error);
      }
      setRefresh(prev => !prev); // Toggle refresh to trigger useEffect

  };

  // Delete request to delete a task

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}`, { 
        method: "DELETE",
      });
      const data = await response.json();
      console.log("Task deleted:", data);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setRefresh(prev => !prev); // Toggle refresh to trigger useEffect
  };

  return (
    <>
      
      <div className="w-full  bg-[#CBDCEB] flex justify-center items-center flex-col gap-5">
        <form
          action=""
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-3 py-5"
        >
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            id="title"
            className=""
            type="text"
            placeholder="Add a new task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description">Description:</label>

          <input
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <label htmlFor="priority">Priority:</label>
          <select
            name="priority"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            className="bg-[#6D94C5] w-20 h-10 rounded-md text-white cursor-pointer"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>

      <FetchData updateTask={updateTask} deleteTask={deleteTask} />
      <Toaster toast={toast} type={type} />
    </>
  );
}

export default TaskForm