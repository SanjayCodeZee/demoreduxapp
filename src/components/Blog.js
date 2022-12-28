import React, { useState } from "react";

function Blog() {
    const [inputVal, setInputVal] = useState("");
    const [todolist, setTodoList] = useState([]);
    const [editTodo, setEditTodo] = useState('');

    const addNewItem = () => {        
        if (inputVal) {
            setTodoList([...todolist, { id: Math.random().toString().substr(9, 4), name: inputVal }])
            setInputVal("");
        } else {
            alert("Please enter input.")
        }
    }

    const updateItem = () => {
        const newState = todolist.map(obj => {
          if (obj.id === editTodo) {
            return {...obj, name: inputVal};
          }
          return obj;
        });    
        setTodoList(newState);
        setEditTodo('');
        setInputVal("");

    };

    const deleteItem = (id) => {
        const lists = todolist.filter((item) => item.id !== id);
        setTodoList(lists);
    }

    const editItem = (id) => {
        const lists = todolist.filter((item) => item.id === id);
        setEditTodo(id);
        setInputVal(lists[0].name);
        //setTodoList(lists);
    }

    
    return (
        <>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <input type="text" name="fieldval" value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                    />
                    {!editTodo?<button type="submit" onClick={addNewItem}>Add</button>:
                    <button type="submit" onClick={updateItem}>Update</button>}
                    <div className="todolist">
                        {todolist?.map((item, i) => {
                            return <div className="todoitem" key={i}>{item.name} 
                            <button onClick={() => editItem(item.id)}>Edit</button>
                            <button onClick={() => deleteItem(item.id)}>X</button></div>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
