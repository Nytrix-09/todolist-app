import React, { useState, useEffect } from 'react';
import './App.css';

const baseURL = "http://localhost:3001/todos"; // Adjusted the port to 3001 as per common JSON server setup

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [curId, setCurId] = useState(null);
  const [editText, setEditText] = useState(false);

  // Fetch items from JSON server
  useEffect(() => {
    (async () => {
      const res = await fetch(baseURL);
      const items = await res.json();
      setItems(items);
    })();
  }, []); // Adding empty dependency array to prevent continuous re-fetching

  // Add item
  async function addItem() {
    if (!newItem) {
      alert("Enter a todo!");
      return;
    }

    const newItemObj = { name: newItem };

    await fetch(baseURL, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newItemObj)
    });

    setNewItem('');
    setItems(prevItems => [...prevItems, newItemObj]); // Updating the state to reflect the added item
  }

  // Delete item
  async function deleteItem(id) {
    await fetch(`${baseURL}/${id}`, {
      method: 'DELETE'
    });

    setItems(prevItems => prevItems.filter(item => item.id !== id)); // Updating the state to reflect the deleted item
  }

  // Toggle edit mode
    function newEdit(itemId, itemValue) {
      setCurId(itemId);
      setEditText(itemValue);
      
    }


  // Handle edit
  async function handleEdit(id) {
    await fetch(`${baseURL}/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({ name: editText })
    });

    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, name: editText } : item
    ));
    setCurId(null); // Exiting edit mode
    setEditText("");
  }



  return (
    <div className="App">
      <h1>toDoList App</h1>

      <input
        type="text"
        placeholder="Add a to-do!"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />

      <button onClick={addItem}>Add</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {curId === item.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button onClick={() => handleEdit(item.id)}>Save</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => newEdit(item.id, item.name)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
