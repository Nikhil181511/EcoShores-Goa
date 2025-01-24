import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, query, onSnapshot, addDoc, serverTimestamp, doc, getDoc, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './comm.css';

const CommunityChat = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Authentication and admin check
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
          setIsAdmin(userDoc.exists() ? userDoc.data().isAdmin : false);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Fetch community groups
  useEffect(() => {
    if (!user) return;

    setLoadingGroups(true);
    const communityRef = doc(firestore, 'communities', 'mainCommunity');
    const groupsQuery = collection(communityRef, 'groups');

    const unsubscribeGroups = onSnapshot(
      groupsQuery,
      (snapshot) => {
        const groupsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGroups(groupsData);
        
        // Set initial selected group to first announcement group
        if (!selectedGroup) {
          const initialGroup = groupsData.find(g => g.type === 'announcement') || groupsData[0];
          setSelectedGroup(initialGroup);
        }
        setLoadingGroups(false);
      },
      (error) => {
        console.error('Error fetching groups:', error);
        setLoadingGroups(false);
      }
    );

    return () => unsubscribeGroups();
  }, [user]); // Removed selectedGroup from dependencies

  // Fetch group messages
  useEffect(() => {
    if (!selectedGroup || !user) return;

    setLoadingMessages(true);
    const messagesRef = collection(
      firestore, 
      'communities', 'mainCommunity', 
      'groups', selectedGroup.id, 
      'messages'
    );
    
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribeMessages = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate()
        }));
        setMessages(messagesData);
        setLoadingMessages(false);
      },
      (error) => {
        console.error('Error fetching messages:', error);
        setLoadingMessages(false);
      }
    );

    return () => unsubscribeMessages();
  }, [selectedGroup, user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedGroup) return;

    if (selectedGroup.type === 'announcement' && !isAdmin) {
      alert('Only admins can post in announcements!');
      return;
    }

    try {
      const messagesRef = collection(
        firestore,
        'communities', 'mainCommunity',
        'groups', selectedGroup.id,
        'messages'
      );
      
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: user.uid,
        senderName: user.displayName || 'Anonymous',
        timestamp: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="community-container">
      {/* Groups Sidebar */}
      <div className="groups-sidebar">
        <h2>Community Groups</h2>
        {loadingGroups ? (
          <div className="loading">Loading groups...</div>
        ) : (
          <div className="groups-list">
            {groups.map(group => (
              <div
                key={group.id}
                className={`group-item ${selectedGroup?.id === group.id ? 'active' : ''}`}
                onClick={() => setSelectedGroup(group)}
              >
                <h4>{group.name}</h4>
                <p>{group.description}</p>
                {group.type === 'announcement' && <span className="badge">Announcements</span>}
              </div>
            ))}
            {groups.length === 0 && (
              <div className="no-groups">No groups available</div>
            )}
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="chat-container">
        {selectedGroup ? (
          <>
            <div className="chat-header">
              <h3>{selectedGroup.name}</h3>
              <p>{selectedGroup.description}</p>
            </div>

            <div className="messages-container">
              {loadingMessages ? (
                <div className="loading">Loading messages...</div>
              ) : (
                <>
                  {messages.map(message => (
                    <div key={message.id} className="message">
                      <div className="message-header">
                        <span className="sender">{message.senderName}</span>
                        <span className="time">
                          {message.timestamp?.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="message-content">{message.text}</div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="no-messages">No messages yet</div>
                  )}
                </>
              )}
            </div>

            <form className="message-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={
                  selectedGroup.type === 'announcement' && !isAdmin
                    ? 'Only admins can post here'
                    : 'Type your message...'
                }
                disabled={selectedGroup.type === 'announcement' && !isAdmin}
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || (selectedGroup.type === 'announcement' && !isAdmin)}
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="no-group-selected">
            <p>Select a group from the sidebar to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityChat;