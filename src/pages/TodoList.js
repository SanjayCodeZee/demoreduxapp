import React, { useState } from "react"

export const TodoList = () =>{

  const [taskval, setTaskVal] = useState('');
  const [editTaskId, setEditTaskId] = useState('');
  const [taskList, setTaskLists] = useState([]);
  
  const addNewTask = () =>{
    if(taskval == '' || taskval === undefined){
      alert('Please Enter Task Value')
    }else{      
      setTaskLists([...taskList, { id : Math.floor(100000 + Math.random() * 900000), value : taskval}]);
      setTaskVal('');
    }
  }

  const updateTask = () =>{
    const newList = taskList.map(obj=>{
      if (obj.id === editTaskId) {
        return {...obj, value: taskval};
      }
      return obj;
    })
    setTaskLists(newList)
    setTaskVal('')
    setEditTaskId('')
  }

  const editTask = (itemid)=>{
    const result = taskList.find(item=> item.id === itemid);
    setTaskVal(result.value);
    setEditTaskId(itemid)
  }

  const deleteTask = (itemid)=>{
    const result = taskList.filter(item=> item.id !== itemid);
    setTaskLists(result);
  }

  return(
    <>
      <section className="wrappper">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="loging-content">
                  <div className="app-header"><h3>Todo List</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            name="taskvalue"
                            className="form-control"
                            placeholder="Add New Task"
                            value={taskval}
                            onChange={(e)=>setTaskVal(e.target.value)}
                        />
                        {(!editTaskId)?
                        <button
                        className="btn btn-info"
                        onClick={addNewTask}>Add</button>:<button
                        className="btn btn-info"
                        onClick={updateTask}>Update</button>}
                    </div>
                  </div>
                  {taskList.length > 0 ?
                  <ul className="task-list">
                    {taskList.map((item)=>{
                      return <li className="task-list-item" key={item.id}>
                      <label className="task-list-item-label">
                        <span>{item.value}</span>
                      </label>
                      <span 
                      className="edit-btn"
                      onClick={()=>editTask(item.id)}><i className="fa fa-edit"></i></span>
                      <span 
                      className="delete-btn"
                      onClick={()=>deleteTask(item.id)}><i className="fa fa-trash"></i></span>
                    </li>})}
                  </ul>:''}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )

} 

export default TodoList;