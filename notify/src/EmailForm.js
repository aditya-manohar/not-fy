import React, { useState } from "react";
import "./EmailForm.css";

function EmailForm() {
    const [time, setTime] = useState("");
    const [sender, setSender] = useState("");
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSendEmail = () => {
        // Add logic to send email here
        if (!time || !sender || !recipient || !subject || !body) {
            setErrorMessage("Please fill out all fields");
            return;
        }

        // Set timer to send email
        const currentTime = new Date().getTime();
        const emailTime = new Date(time).getTime();
        const timeDiff = emailTime - currentTime;

        if (timeDiff > 0) {
            setTimeout(() => {
                // Send email logic goes here
                setSuccessMessage("Email sent successfully!");
            }, timeDiff);
        } else {
            setErrorMessage("Please select a future time for sending the email");
        }
    };

    return (
        <div className="email-form">
            <h2>Email Settings</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="input-group">
                <label htmlFor="time">Time:</label>
                <input
                    type="datetime-local"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="sender">Sender:</label>
                <input
                    type="email"
                    id="sender"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="recipient">Recipient:</label>
                <input
                    type="email"
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="body">Body:</label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={6}
                ></textarea>
            </div>
            <button onClick={handleSendEmail}>Set Timer</button>
        </div>
    );
}

export default EmailForm;
