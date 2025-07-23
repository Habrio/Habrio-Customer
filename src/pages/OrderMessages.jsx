import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/App.css';

export default function OrderMessages() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchMessages();
    fetchUserPhone();
  }, [orderId]);

  const fetchUserPhone = async () => {
    try {
      const res = await fetch(`${backendUrl}/profile/me`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setUserPhone(data.data.phone);
      }
    } catch (error) {
      console.error('Error fetching user phone:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${backendUrl}/order/consumer/messages/${orderId}`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setSending(true);
    try {
      const res = await fetch(`${backendUrl}/order/consumer/message/send/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ message: newMessage.trim() })
      });

      const data = await res.json();
      if (data.status === 'success') {
        setNewMessage('');
        fetchMessages(); // Refresh messages
      } else {
        alert(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Something went wrong. Please try again.');
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="screen-content">
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid var(--divider)', 
            borderTop: '3px solid var(--primary-color)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', background: 'white', padding: '20px 0' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            marginRight: '16px',
            cursor: 'pointer'
          }}
        >
          ←
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
            Order #{orderId}
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
            Chat with vendor
          </p>
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'var(--primary-gradient)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px'
        }}>
          🏪
        </div>
      </div>

      {/* Messages Container */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '0 0 20px 0',
        marginBottom: '80px' // Space for input area
      }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>💬</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
              No messages yet
            </h3>
            <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              Start a conversation with the vendor about your order
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((message, index) => {
              const isMyMessage = message.sender_phone === userPhone;
              return (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
                    marginBottom: '8px'
                  }}
                >
                  <div style={{
                      maxWidth: '75%',
                      padding: '12px 16px',
                      borderRadius: isMyMessage 
                        ? '18px 18px 4px 18px' 
                        : '18px 18px 18px 4px',
                      background: isMyMessage 
                        ? 'var(--primary-gradient)'
                        : 'var(--background-soft)',
                      color: isMyMessage ? 'white' : 'var(--text-primary)',
                      border: isMyMessage ? 'none' : '1px solid var(--divider)'
                    }}>
                    <p style={{ margin: '0 0 6px 0', fontSize: '14px', lineHeight: '1.4' }}>
                      {message.message}
                    </p>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '11px', 
                      opacity: isMyMessage ? 0.8 : 0.6,
                      textAlign: 'right'
                    }}>
                      {new Date(message.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Message Input Area */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid var(--divider)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        zIndex: 1000
      }}>
        <div style={{ flex: 1 }}>
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            style={{
              width: '100%',
              minHeight: '40px',
              maxHeight: '120px',
              padding: '10px 16px',
              border: '1px solid var(--divider)',
              borderRadius: '20px',
              fontSize: '14px',
              resize: 'none',
              fontFamily: 'inherit',
              outline: 'none'
            }}
            rows={1}
          />
        </div>
        
        <button
          onClick={sendMessage}
          disabled={sending || !newMessage.trim()}
          style={{
            width: '44px',
            height: '44px',
            background: sending || !newMessage.trim() 
              ? 'var(--text-disabled)' 
              : 'var(--primary-gradient)',
            color: 'white',
            border: 'none',
            borderRadius: '22px',
            cursor: sending || !newMessage.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            opacity: sending || !newMessage.trim() ? 0.6 : 1,
            flexShrink: 0
          }}
        >
          {sending ? '⏳' : '➤'}
        </button>
      </div>

      {/* Quick Replies */}
      {messages.length === 0 && (
        <div style={{
          position: 'fixed',
          bottom: '80px', // Above the input area
          left: '20px',
          right: '20px',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid var(--divider)',
          padding: '16px',
          zIndex: 999
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
            Quick messages:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Can you deliver earlier?',
              'Please call before delivery',
              'Is this item fresh?',
              'Can you provide a substitute?'
            ].map((quickMessage, index) => (
              <button
                key={index}
                onClick={() => setNewMessage(quickMessage)}
                style={{
                  background: 'var(--background-soft)',
                  border: '1px solid var(--divider)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {quickMessage}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}