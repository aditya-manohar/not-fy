import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "./Notes.css";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

function Sidebar({ notes, remove, editNote, notifiedNoteIds }) {
    const [editingNote, setEditingNote] = useState(null);

    const handleEdit = (note) => {
        setEditingNote(note);
    };

    const handleSave = (note) => {
        editNote(note);
        setEditingNote(null);
    };

    const handleCancel = () => {
        setEditingNote(null);
    };

    return (
        <div className="sidebar">
            <h3>Notes List</h3>
            <div className="notes-list">
                {notes.map((e) => (
                    <div
                        className={`note-item ${notifiedNoteIds.includes(e.key) ? 'notified' : ''}`}
                        key={e.key}
                    >
                        {editingNote?.key === e.key ? (
                            <div className="list-add">
                                <input
                                    type="text"
                                    value={editingNote.title}
                                    onChange={(e) =>
                                        setEditingNote({
                                            ...editingNote,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    value={editingNote.des}
                                    onChange={(e) =>
                                        setEditingNote({
                                            ...editingNote,
                                            des: e.target.value,
                                        })
                                    }
                                    rows={3}
                                ></textarea>
                                <button className="save" onClick={() => handleSave(editingNote)}>Save</button>
                                <button className="cancel" onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h4><span style={{ color: 'orangered' }}>Title : </span>{e.title}</h4>
                                <p><span style={{ color: 'orangered', fontWeight: 'bold' }}>Note : </span> {e.des}</p>
                                <p>
                                    <span style={{ color: 'orangered', fontWeight: 'bold' }}>Time : </span> {e.time}
                                </p>
                                <FaRegEdit className="edit" onClick={() => handleEdit(e)} />
                                <MdDelete className="delete" onClick={() => remove(e.key)} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Notes() {
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useLocalStorage("notes", []);
    const [errorMessage, setErrorMessage] = useState("");
    const [notifiedNoteIds, setNotifiedNoteIds] = useState([]);

    function remove(id) {
        setNotes(notes.filter((e) => e.key !== id));
        setNotifiedNoteIds((prevIds) => prevIds.filter((noteId) => noteId !== id));
    }

    function editNote(updatedNote) {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.key === updatedNote.key ? updatedNote : note
            )
        );
    }

    function handle() {
        if (!title || !des || !time) {
            setErrorMessage("Please fill out all fields");
            return;
        }
        const note = {
            key: Date.now(),
            title: title,
            des: des,
            time: time,
        };
        setNotes([...notes, note]);
        setTitle("");
        setDes("");
        setTime("");
        setNotification(note);
        setErrorMessage("");
    }

    function setNotification(note) {
        const currentTime = new Date().getTime();
        const noteTime = new Date(note.time).getTime();
        const timeDiff = noteTime - currentTime;
        if (timeDiff > 0) {
            setTimeout(() => {
                new Notification("Task Reminder", {
                    body: `Reminder: ${note.title}`,
                });
                setNotifiedNoteIds((prevIds) => [...prevIds, note.key]);
            }, timeDiff);
        }
    }

    return (
        <div className="notes-app">
            <Sidebar notes={notes} remove={remove} editNote={editNote} notifiedNoteIds={notifiedNoteIds} />
            <div className="form">
                <h2>
                    Not<span style={{ color: "orangered" }}>!</span>fy
                </h2>
                <div className="notes-add">
                    <h3>Add Notes</h3>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <input
                        type="text"
                        id="title"
                        placeholder="Add title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <textarea
                        id="description"
                        placeholder="Notes"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                        rows={6}
                    ></textarea>
                    <input
                        type="datetime-local"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    ></input>
                    <center>
                        <button type="submit" onClick={handle}>
                            Add Note
                        </button>
                    </center>
                </div>
            </div>
        </div>
    );
}

export default Notes;
