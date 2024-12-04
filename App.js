import React, { useState } from "react";
import "./App.css";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editMode, setMode] = useState(false);
  const [currentEditModeId, setEditModeId] = useState("");
  const [editModeValue, setEditModeValue] = useState("");

  const getId = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const uponSubmitButtonClick = () => {
    const currentTodoItems = [...todoItems];

    currentTodoItems.push({
      id: getId(1, 1000),
      value: inputValue,
    });

    setInputValue("");
    setTodoItems(currentTodoItems);
  };

  const uponDeleteButtonClick = (delteItemId) => {
    const currentTodoItems = [...todoItems];

    const filterTodoItems = currentTodoItems.filter(
      (item) => item.id !== delteItemId
    );

    setTodoItems(filterTodoItems);
  };

  const editTodoItemContent = (editItemId, initialItemValue) => {
    setEditModeId(editItemId);
    setMode(true);
    setEditModeValue(initialItemValue);
  };

  const onChangeItem = (changedItem) => {
    setEditModeValue(changedItem);
  };

  const onSaveButtonClicked = (currentItemId) => {
    const currentTodoItem = [...todoItems];
    currentTodoItem.map((item) => {
      if (item.id === currentItemId) {
        item.value = editModeValue;
      }
    });

    setMode(false);
    setEditModeValue("");
    setTodoItems(currentTodoItem);
  };

  return (
    <div>
      <input
        placeholder="add todo items here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={uponSubmitButtonClick}>Submit</button>
      {todoItems && (
        <ul>
          {todoItems.map((item) => (
            <li key={item.id}>
              {item.id === currentEditModeId && editMode ? (
                <input
                  value={editMode ? editModeValue : item.value}
                  onChange={(e) => onChangeItem(e.target.value)}
                />
              ) : (
                item.value
              )}

              {item.id === currentEditModeId && editMode ? (
                <button onClick={() => onSaveButtonClicked(item.id)}>
                  Save
                </button>
              ) : (
                <button
                  onClick={() => editTodoItemContent(item.id, item.value)}
                >
                  Edit
                </button>
              )}
              <button onClick={() => uponDeleteButtonClick(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
