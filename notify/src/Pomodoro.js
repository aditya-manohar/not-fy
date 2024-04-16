import React, { useState, useEffect } from "react";
import "./Pomodoro.css";

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

function Pomodoro() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(25 * 60);
    const [errorMessage, setErrorMessage] = useState("");
    const [isPomodoroCompleted, setIsPomodoroCompleted] = useState(false);

    useEffect(() => {
        if (timerSeconds === 0) {
            setIsPomodoroCompleted(true);
            new Notification("Pomodoro Completed", {
                body: `Time's up for: ${tasks[0]}`,
            });
            setTasks(tasks.slice(1));
        }
    }, [timerSeconds, tasks, setTasks]);

    useEffect(() => {
        if (isPomodoroCompleted) {
            setTimerSeconds(25 * 60);
            setIsTimerRunning(false);
            setIsPomodoroCompleted(false);
        }
    }, [isPomodoroCompleted]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const startTimer = () => {
        if (tasks.length === 0) {
            setErrorMessage("Please enter a task");
            return;
        }
        setIsTimerRunning(true);
    };

    const stopTimer = () => {
        setIsTimerRunning(false);
    };

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const addTask = () => {
        if (!task) {
            setErrorMessage("Please enter a task");
            return;
        }
        setTasks([...tasks, task]);
        setTask("");
        setErrorMessage("");
    };

    return (
        <div className="pomodoro-app">
            <div className="tasks">
                <h3>Tasks</h3>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            </div>
            <div className="timer">
                <h2>Pomodoro Timer</h2>
                <div className="timer-display">{formatTime(timerSeconds)}</div>
                <div className="timer-controls">
                    {!isTimerRunning ? (
                        <button onClick={startTimer}>Start</button>
                    ) : (
                        <button onClick={stopTimer}>Stop</button>
                    )}
                </div>
            </div>
            <div className="add-task">
                <h3>Add Task</h3>
                <input
                    type="text"
                    value={task}
                    onChange={handleTaskChange}
                    placeholder="Enter task"
                />
                <button onClick={addTask}>Add Task</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Pomodoro;
