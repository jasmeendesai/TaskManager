import TaskContext from "./taskContext";
import {useState} from "react";

const TaskState = (props)=>{
    
    const host = "http://localhost:5000"
    
    const initialState = []
    const [tasks, setTasks] = useState(initialState)
    // const [notes, setTasks] = useState([])

    //addTask
    const addTask = async (title, description)=>{
        //Todo Api call
        const response = await fetch(`${host}/api/tasks/createTasks`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description})
          });
          const json = await response.json()
        const note = json.data
        setTasks(tasks.concat(note))
        return json
    }
    //getTask
    // const getTask = async(status)=>{

    //     let endpoint = status ? `${host}/api/tasks/getTasks` : `${host}/api/tasks/getTasks?status=${status}`
    //     const response = await fetch(endpoint, {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           "token": localStorage.getItem('token')
    //         },
    //       });
    //       const json = await response.json()
      
    //       setTasks(json.data)      
    // }

    const getTask = async (status) => {
      let endpoint = `${host}/api/tasks/getTasks`;
    
      if (status && status !== 'All') {
        endpoint += `?status=${status}`;
      }
    
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      });
    
      const json = await response.json();
      setTasks(json.data);
    };
    

    //updateTask
    const updateTask = async (id, title, description, status)=>{
        //Todo Api call
        const response = await fetch(`${host}/api/tasks/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, status})
          });
          const json = await response.json()
        const updatetask = tasks.map((task)=>{
            if(task._id===id){
              if(title)
                task.title = title
              if(description)
                task.description = description
              if(status)
                task.status=status
            }
            return task
        })
        setTasks(updatetask)
        return json
    }

    //deleteTask
    const deleteTask = async (id)=>{
        //Todo Api call
        const response = await fetch(`${host}/api/tasks/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "token": localStorage.getItem('token')
            }
          });
          const json = await response.json()
          
        const newTasks= tasks.filter((task)=>{return task._id!==id})
        setTasks(newTasks)
        return json
    }


    return(
        <TaskContext.Provider value={{tasks, addTask, updateTask, deleteTask, getTask}}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState