import './ChatRoom.css'

import React, { useState, useEffect } from 'react';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const fetchMessages = async () => {
        try {
            const response = await fetch('https://chatroombackend-ej7g.onrender.com/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            await fetch('https://chatroombackend-ej7g.onrender.com/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, message }),
            });

            // Clear the message input after sending
            setMessage('');
            // Fetch messages to update the list
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        // Fetch messages on component mount
        fetchMessages();
        // Poll for new messages every 2 seconds
        const interval = setInterval(() => {
            fetchMessages();
        }, 2000);

        return () => clearInterval(interval);
    }, []); // Run only once on mount

    return (
        <div>
            <h2>World Chat Room</h2>
            <ul>
                {messages.map((message) => (
                    <li key={message._id}>
                        <strong>{message.user}:</strong> {message.message}
                    </li>
                ))}
            </ul>
            <div className='TypeMessage'>

                <div className='flex'>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={() => {
                        if (user.trim() === '' || message.trim() === '') {
                            alert("Message or User cannot be empty");
                        } else {
                            sendMessage();
                        }
                    }}>Send</button>
                </div>

            </div>

        </div>
    );
};

export default ChatRoom;
