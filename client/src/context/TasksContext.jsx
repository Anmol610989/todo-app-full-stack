import React, { createContext, useState, useEffect } from "react";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(true);

  const [refresh, setRefresh] = useState(false); // state to trigger data refresh

  // state for fetching data from server
  const [data, setData] = useState([]);
  

  return (
    <TasksContext.Provider value={{ title, setTitle, description, setDescription, dueDate, setDueDate, priority, setPriority, data, setData, refresh , setRefresh }}>
      {children}
    </TasksContext.Provider>
  );
};
export default TasksProvider;