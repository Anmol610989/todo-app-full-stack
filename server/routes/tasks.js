const express = require("express")
const router = express.Router();
const Task = require("../models/Task")

router.get("/", (req, res)=>{
    // res.send("All tasks")
    Task.find().then((tasks)=>{
        res.status(200).json(tasks)
    }).catch((error)=>{
        res.status(500).json({message: "Server error"})
    })
})
router.get("/:id", (req, res)=>{
    // res.send("All tasks")
    const id = req.params.id
    Task.find({_id: id}).then((tasks)=>{
        res.status(200).json(tasks)
    }).catch((error)=>{
        res.status(500).json({message: "Server error"})
    })
})
router.post("/", async (req, res)=>{
    console.log(req.body)
    const { title, description, dueDate, priority } = req.body;
    const newTask = new Task({
      title: title,
      description: description,
      completed: false,
      dueDate: dueDate,
    // ...(dueDate ? { dueDate } : {}),  // Handle null date value from frontend
      priority:priority
    });
    try {
      const savedTask = await  newTask.save()  // save() is asynchronous
      res.status(201).json(savedTask)
    } catch (error){
        res.status(400).json({message: "Task creation failed"})
    }
})

router.put("/:id", async (req, res)=>{
    const id = req.params.id;
    const {title, description, dueDate, priority, completed} = req.body 
    try{
     const updatedTask = await Task.findByIdAndUpdate(
       id,
         { title, description,completed, dueDate, priority  },  
            { new: true } // To return the updated document
        )   
        if(!updatedTask){
            return res.status(404).json({message: "Task not found"})
        }
        res.status(200).json(updatedTask )

    }
    catch(err){
    res.status(400).json({message: "Task updation failed"})
    }
})
// router.put("/:id", async (req, res)=>{
//     const id = req.params.id;
//     const {title, description, dueDate, priority, completed} = req.body
    //  const updatedTask = new Task({
    //    title: title,
    //    description: description,
    //    dueDate: dueDate,
    //    priority: priority,
    //    completed: completed
    //  });
    //   try {
    //     const savedTask = await updatedTask.save(); // save() is asynchronous
    //     res.status(201).json(savedTask);
    //   } catch (error) {
    //     res.status(400).json({ message: "Task updation failed" });
    //   }
// try{
//  const updatedTask = await Task.updateOne(
//    { _id: id },
//    { $set: { title, description, dueDate, priority, completed } }
// )
//     res.status(200).json(updatedTask )

// }
// catch(err){
// res.status(400).json({message: "Task updation failed"})
// }       
// }) 


router.delete("/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const deletedTask = await Task.findByIdAndDelete(id)
        if(!deletedTask){
            return res.status(404).json({message: "Task not found"})
        }
        res.status(200).json({message: "Task deleted successfully"})
    } catch (error){
        res.status(500).json({message: "Server error"})
    }   
})


module.exports = router