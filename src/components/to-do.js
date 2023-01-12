import React, { useState, useEffect } from "react";

export default function ToDo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("localTasks")){
        const storedTasks = JSON.parse(localStorage.getItem("localTasks"));
        setTasks(storedTasks);
    }
  },[])

  const addTask = (e)=>{
    if(task){
        const newTask = {id: new Date().getTime().toString(), title: task}
        setTasks([...tasks, newTask]);
        localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
        setTask("");
    }
  }

  const handleDelete = (task) => {
    console.log(task);
    const deleted = tasks.filter((t)=>t.id !== task.id);
    console.log(deleted);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  }

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");


  }

  return (
    <div className="container row">
      <h1 className="mt-3">To Do List</h1>
      <div className="col-8 mb-2">
        <input
          name="task"
          type="text"
          value={task}
          placeholder="What to do..."
          className="form-control"
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="col-4 mb-2">
        <button className="btn btn-primary form-control material-icons"
        onClick={addTask}>
          add
        </button>
      </div>
      <div className="badge text-black">
        You have
        {!tasks.length
          ? " no task"
          : tasks.length === 1
          ? " 1 task"
          : tasks.length > 1
          ? ` ${tasks.length} tasks`
          : null}
      </div>
      {
        tasks.map( (task)=>(
            <React.Fragment key={task.id}>
                <div className='col-11'>
                    <span className = 'form-control border border-primary btn my-2'>
                        {task.title}
                    </span>
                </div>

                <div className='col-1'>
                    <button 
                    className='my-2 btn btn-warning material-icons'
                    onClick={()=> handleDelete(task)}>delete</button>
                </div>
            </React.Fragment>
        ))
      }
      {!tasks.length? null :(
        <div>
            <button className='btn btn-danger my-4' onClick={()=>handleClear()}>
                Clear All Tasks
            </button>
        </div>
      )}
    </div>
  );
}
