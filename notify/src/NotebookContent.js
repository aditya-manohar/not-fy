// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NotebookContent from './NotebookContent';
import './App.css';

const App = () => {
    const [notebooks, setNotebooks] = useState([]);
    const [newNotebookName, setNewNotebookName] = useState('');

    const addNotebook = () => {
        if (newNotebookName.trim() !== '') {
            const newNotebook = {
                id: Date.now(),
                title: newNotebookName,
                notes: [],
            };
            setNotebooks([...notebooks, newNotebook]);
            setNewNotebookName('');
        }
    };

    const handleNotebookNameChange = (e) => {
        setNewNotebookName(e.target.value);
    };

    const deleteNotebook = (id) => {
        setNotebooks(notebooks.filter((notebook) => notebook.id !== id));
    };

    return (
        <Router>
            <div className="App">
                <h1>Digital Notebook</h1>
                <div className="addNotebook">
                    <input
                        type="text"
                        value={newNotebookName}
                        onChange={handleNotebookNameChange}
                        placeholder="Enter notebook name"
                    />
                    <button className="addButton" onClick={addNotebook}>
                        Add Notebook
                    </button>
                </div>
                <div className="notebookList">
                    {notebooks.map((notebook) => (
                        <div key={notebook.id} className="notebookCard">
                            <Link to={`/notebook/${notebook.id}`}>
                                <h2>{notebook.title}</h2>
                            </Link>
                            <button onClick={() => deleteNotebook(notebook.id)}>Delete Notebook</button>
                        </div>
                    ))}
                </div>
                <Routes>
                    <Route path="/notebook/:id" component={NotebookContent} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
