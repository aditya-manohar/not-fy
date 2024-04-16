// App.js
import React, { useState, useEffect } from 'react';
import './Stickit.css';

const Stickit = () => {
    const [notes, setNotes] = useState([]);
    const [newNoteText, setNewNoteText] = useState('');
    const [newNoteColor, setNewNoteColor] = useState('#ffcc00'); // Default color

    // Load notes from local storage on initial render
    useEffect(() => {
        const storedNotes = localStorage.getItem('stickyNotes');
        if (storedNotes) {
            setNotes(JSON.parse(storedNotes));
        }
    }, []);

    // Save notes to local storage whenever notes state changes
    useEffect(() => {
        localStorage.setItem('stickyNotes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (!newNoteText.trim()) return;
        const newNote = {
            id: Date.now(),
            text: newNoteText,
            top: 100,
            left: 100,
            color: newNoteColor
        };
        setNotes([...notes, newNote]);
        setNewNoteText('');
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const noteIndex = notes.findIndex(note => note.id === parseInt(id));
        if (noteIndex !== -1) {
            const updatedNotes = [...notes];
            updatedNotes[noteIndex].left = e.clientX;
            updatedNotes[noteIndex].top = e.clientY;
            setNotes(updatedNotes);
        }
    };

    const handleNoteChange = (e, id) => {
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return { ...note, text: e.target.value };
            }
            return note;
        });
        setNotes(updatedNotes);
    };

    const deleteNote = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
    };

    const handleColorChange = (color, id) => {
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return { ...note, color: color };
            }
            return note;
        });
        setNotes(updatedNotes);
    };

    return (
        <div className="App" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1>Sticky Notes App</h1>
            <div className="note-container">
                {notes.map(note => (
                    <div
                        key={note.id}
                        className="sticky-note"
                        style={{ top: note.top, left: note.left, backgroundColor: note.color }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, note.id)}
                    >
                        <button className="deleteButton" onClick={() => deleteNote(note.id)}>
                            X
                        </button>
                        <input
                            type="color"
                            value={note.color}
                            onChange={(e) => handleColorChange(e.target.value, note.id)}
                        />
                        <textarea
                            value={note.text}
                            onChange={(e) => handleNoteChange(e, note.id)}
                        ></textarea>
                    </div>
                ))}
            </div>
            <div className="add-note">
                <input
                    type="text"
                    placeholder="Enter your note text..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                />
                <input
                    type="color"
                    value={newNoteColor}
                    onChange={(e) => setNewNoteColor(e.target.value)}
                />
                <button onClick={addNote}>Add Note</button>
            </div>
        </div>
    );
};

export default Stickit;
