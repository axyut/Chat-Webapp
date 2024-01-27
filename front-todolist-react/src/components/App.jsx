import React, { useState } from "react";
import ToDoItem from "./ToDoItem";

function App() {
  const [inputData, setInputData] = useState("");
  const [items, setItem] = useState([]);

  function inputComing(event) {
    setInputData(event.target.value);
  }
  function addToList() {
    setItem((previtems) => [inputData, ...previtems]);
    setInputData("");
  }
  function deleteItem(id) {
    setItem((previtems) => previtems.filter((item, index) => index !== id));
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input value={inputData} type="text" onChange={inputComing} />
        <button onClick={addToList}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((toDoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={toDoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
