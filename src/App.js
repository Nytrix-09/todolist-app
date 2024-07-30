import React, {useState} from 'react';
import './App.css';

function App() {
  
  //creating a state hook
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  
  
  //addItem
  function addItem() {

    if(!newItem){
      alert("Enter a todo!");
      return;
    }

    //add item to the list
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem
    };

    setItems(oldList => [...oldList, item]);

    setNewItem("");
  }

  
  //deleteItem
  function deleteItem (id) {
    //delete item from the list
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
    
    };
  
    return (
    <div className="App">
    <h1>toDoList App</h1>
   
   
    <input type ="text" 
      placeholder='Add a to-do!' 
      value={newItem}
      onChange={e => setNewItem(e.target.value)}/>  
    
    
    <button onClick={() =>addItem()}>Add</button>

    <ul>
      {items.map(item => {
        return (
          <li key={item.id}>{item.value} <button onClick={() => deleteItem(item.id)}>Delete</button></li>
          )
      })}   
    </ul>
  </div>
  );
}

export default App;
