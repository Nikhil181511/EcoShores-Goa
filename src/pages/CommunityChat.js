import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import './CommunityChat.css';

const CommunityChat = () => {
    const communities = [
        { id: 1, name: 'Main Announcements' },
        { id: 2, name: 'NGO Discussions' },
        { id: 3, name: 'Youth Club' },
        { id: 4, name: 'Village Ward 1' },
        { id: 5, name: 'Village Ward 2' },
        { id: 6, name: 'Reports' } // New "Reports" group
    ];

    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (selectedCommunity) {
            if (selectedCommunity.name === 'Reports') {
                // Fetch reports from Firestore
                const reportQuery = query(collection(db, 'reports'), orderBy('timestamp', 'desc'));
                const unsubscribe = onSnapshot(reportQuery, (snapshot) => {
                    const fetchedReports = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setMessages(fetchedReports);
                });
                return () => unsubscribe();
            } else {
                // Fetch chat messages
                const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const fetchedMessages = snapshot.docs
                        .map((doc) => ({ id: doc.id, ...doc.data() }))
                        .filter((msg) => msg.community === selectedCommunity.name);
                    setMessages(fetchedMessages);
                });
                return () => unsubscribe();
            }
        }
    }, [selectedCommunity]);

    // Handle selecting a community
    const handleSelectCommunity = (community) => {
        setSelectedCommunity(community);
    };

    // Handle sending a message
    const handleSendMessage = async () => {
        if (newMessage.trim() !== '' && selectedCommunity.name !== 'Reports') {
            try {
                const messageData = {
                    community: selectedCommunity.name,
                    text: newMessage,
                    sender: selectedCommunity.name === 'Main Announcements' ? 'Announcement' : 'You',
                    timestamp: new Date()
                };

                if (selectedCommunity.name === 'Main Announcements') {
                    for (const community of communities) {
                        if (community.name !== 'Reports') {
                            await addDoc(collection(db, 'messages'), {
                                ...messageData,
                                community: community.name
                            });
                        }
                    }
                } else {
                    await addDoc(collection(db, 'messages'), messageData);
                }

                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="community-chat">
            <div className="sidebar">
                <h2>Communities</h2>
                <ul>
                    {communities.map((community) => (
                        <li
                            key={community.id}
                            onClick={() => handleSelectCommunity(community)}
                            className={selectedCommunity?.id === community.id ? 'active' : ''}
                        >
                            {community.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="chat-container">
                {selectedCommunity ? (
                    <>
                        <div className="chat-header">
                            <h3>{selectedCommunity.name}</h3>
                        </div>

                        <div className="chat-messages">
                            {selectedCommunity.name === 'Reports' ? (
                                messages.length > 0 ? (
                                    messages.map((report) => (
                                        <div key={report.id} className="report-message">
                                            <h4>{report.name}</h4>
                                            <p><strong>Description:</strong> {report.description}</p>
                                            <p>
                                                <strong>Location:</strong> {report.coordinates?.lat}, {report.coordinates?.lng}
                                            </p>
                                            {report.photoURL ? (
                                                <img src={report.photoURL} alt="Report" className="report-image" />
                                            ) : (
                                                <p>No image available</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No reports available</p>
                                )
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className={`chat-message ${msg.sender === 'Announcement' ? 'announcement' : ''}`}>
                                        <strong>{msg.sender}:</strong> {msg.text}
                                    </div>
                                ))
                            )}
                        </div>

                        {selectedCommunity.name !== 'Reports' && (
                            <div className="chat-input">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button onClick={handleSendMessage}>Send</button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="chat-placeholder">
                        <p>Select a community to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommunityChat;
