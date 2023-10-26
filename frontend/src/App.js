// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './App.css';

const API_URL = 'http://localhost:3001';

function App() {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');

  useEffect(() => {
    // Fetch lists from the server
    axios.get(`${API_URL}/lists`)
      .then(response => setLists(response.data))
      .catch(error => console.error(error));
  }, []);

  const onDragEnd = result => {
    // Handle task drag and drop logic here
  };

  const handleNewListSubmit = () => {
    // Create a new list on the server
    axios.post(`${API_URL}/lists`, { title: newListTitle })
      .then(response => {
        setLists([...lists, response.data]);
        setNewListTitle('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <div className="lists-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="lists" direction="horizontal">
            {(provided) => (
              <div
                className="lists"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* Render lists and tasks here */}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="new-list-form">
          <input
            type="text"
            placeholder="Enter list title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <button onClick={handleNewListSubmit}>Add List</button>
        </div>
      </div>
    </div>
  );
}

export default App;

