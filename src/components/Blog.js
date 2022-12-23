import React, { useState } from "react";

function Blog() {
    const [inputVal,setInputVal] = useState("");
    const [todolist,setTodoList] = useState([]);
    const [paymentMethod,setPaymentMethod] = useState('');

    const handleChangeRadio = (e) =>{
        setPaymentMethod(e.target.value);
        console.log(paymentMethod);
    }

    const handleChange = (e) =>{
        setInputVal(e.target.value);
    }

    const addNewItem = () =>{
        setTodoList([...todolist,inputVal])
        setInputVal("");
    }

    const deleteItem = (i) =>{
        const lists = todolist.filter((item,id)=> id !== i );
        setTodoList(lists);
    }

    return (
    <>
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <input type="text" name="fieldval" value={inputVal}
                    onChange={handleChange}
                />
                <button type="submit" onClick={addNewItem}>Add</button>
                <div className="todolist">
                    {todolist?.map((item,i)=>{
                        return <div className="todoitem" key={i}>{item} <button onClick={ ()=> deleteItem(i) }>X</button></div>
                    })}
                </div>
            </div>
            <div className="col-md-4">
                <button className="btn btn-primary">+</button>
                <input type="text" className="form-control"  />
                <button className="btn btn-primary">-</button>
            </div>
        </div>
    </>
  );
}

export default Blog;
