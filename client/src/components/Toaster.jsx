import React from 'react'
import {useState} from "react"

const Toaster = ({toast, type}) => {

    const [visible, setVisible] = useState(false);
    if(toast && !visible) {
        setVisible(true);   
    }

    const bgColor = type==="success" ? "bg-green-500" : "bg-red-500";
    if(!toast) return null;

  return (
    <>
      <div
        className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white ${bgColor} transform transition-all duration-500 `}>
        {toast}
      </div>
    </>
  );
}

export default Toaster