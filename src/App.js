import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [task, setTask] = useState(''); 
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');

    const handleInputChange = (e) => {
        setTask(e.target.value); 
    };

    useEffect(() => {
        const savedTasks = window.localStorage.getItem('tasks');
        console.log('Retrieved tasks:', savedTasks); // Debugging
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Sync tasks to localStorage whenever they change
    useEffect(() => {
        console.log('Saving tasks:', tasks);
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (task.trim() !== '') {
            if (task.length <= 24) {
                setTasks([...tasks, task]);
                setTask('');
            } else {
                alert('Task must be 24 characters or less.');
            }
        }
    };

     const handleEditTask = (index) => {
        setEditingIndex(index);
        setEditingText(tasks[index]);
    };
    
    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index)); 
    };

    const handleSaveTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editingText;
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditingText('');
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    value={task}
                    onChange={handleInputChange}
                    placeholder="Enter a task"
                />
                <button className='button add-button' type="submit">Add Task</button>
            </form>
            <div className='task-container'>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index} className="task-item">
                        <span className="task-text">
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    maxLength="24" /* Ensure editing respects the character limit */
                                />
                            ) : (
                                t
                            )}
                        </span>
                        <div className="button-group">
                            {editingIndex === index ? (
                                <button className="button save-button" onClick={() => handleSaveTask(index)}>Save</button>
                            ) : (
                                <>
                                    <button className="button edit-button" onClick={() => handleEditTask(index)}>Edit</button>
                                    <button className="button delete-button" onClick={() => handleDeleteTask(index)}>Delete</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}

export default App;
