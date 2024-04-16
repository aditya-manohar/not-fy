// Noteit.js
import React, { useState } from 'react';
import './Noteit.css'; // Import the CSS file

const Noteit = () => {
    const [notebooks, setNotebooks] = useState([]);
    const [newNotebookName, setNewNotebookName] = useState('');
    const [selectedNotebookId, setSelectedNotebookId] = useState(null);

    const addNotebook = () => {
        if (!newNotebookName.trim()) return;
        const newNotebook = {
            id: Date.now(),
            name: newNotebookName,
            content: '',
        };
        setNotebooks([...notebooks, newNotebook]);
        setNewNotebookName('');
    };

    const deleteNotebook = (id) => {
        setNotebooks(notebooks.filter((notebook) => notebook.id !== id));
        if (selectedNotebookId === id) setSelectedNotebookId(null);
    };

    const handleNotebookClick = (id) => {
        setSelectedNotebookId(id);
    };

    const saveNotebookContent = (id, content) => {
        setNotebooks(
            notebooks.map((notebook) =>
                notebook.id === id ? { ...notebook, content: content } : notebook
            )
        );
    };

    return (
        <div className="Noteit">
            <h1>Digital Notebook</h1>
            <div className="notebook-list">
                {notebooks.map((notebook) => (
                    <div
                        key={notebook.id}
                        className="notebook-card"
                        onClick={() => handleNotebookClick(notebook.id)}
                    >
                        <h3>{notebook.name}</h3>
                        <button className="deleteButton" onClick={() => deleteNotebook(notebook.id)}>
                            Delete
                        </button>
                    </div>
                ))}
                <div className="add-notebook">
                    <input
                        type="text"
                        placeholder="Enter notebook name..."
                        value={newNotebookName}
                        onChange={(e) => setNewNotebookName(e.target.value)}
                    />
                    <button className="addButton" onClick={addNotebook}>
                        Add Notebook
                    </button>
                </div>
            </div>
            <NotebookModal
                notebooks={notebooks}
                selectedNotebookId={selectedNotebookId}
                onSave={saveNotebookContent}
                setSelectedNotebookId={setSelectedNotebookId}
            />
        </div>
    );
};

const NotebookModal = ({ notebooks, selectedNotebookId, onSave, setSelectedNotebookId }) => {
    const notebook = notebooks.find((notebook) => notebook.id === selectedNotebookId);
    const [content, setContent] = useState(notebook?.content || '');

    const handleSave = () => {
        onSave(selectedNotebookId, content);
    };

    return (
        <div className={`notebook-modal ${selectedNotebookId ? 'open' : ''}`}>
            {selectedNotebookId && (
                <div className="modal-content">
                    <span className="close" onClick={() => setSelectedNotebookId(null)}>&times;</span>
                    <h2>Notebook Content</h2>
                    <div
                        className="whiteboard"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => setContent(e.target.innerHTML)}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                    <button className="saveButton" onClick={handleSave}>
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default Noteit;
