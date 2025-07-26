// File: src/pages/OrderMessages.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ScreenContainer from '../components/layout/ScreenContainer';
import PageHeader from '../components/molecules/PageHeader';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Loader';
import EmptyState from '../components/organisms/EmptyState';
import { get, post } from '../utils/api';

export default function OrderMessages() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return navigate('/login');

    // fetch current user phone
    get('/profile/me', { token }).then(({ status, data }) => {
      if (status === 'success') setUserPhone(data.phone);
    });

    // fetch order messages
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, navigate]);

  async function fetchMessages() {
    const token = localStorage.getItem('auth_token');
    try {
      const { status, messages } = await get(
        `/order/consumer/messages/${orderId}`,
        { token }
      );
      if (status === 'success') setMessages(messages);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    if (!newMessage.trim()) return;
    setSending(true);
    const token = localStorage.getItem('auth_token');
    try {
      const { status } = await post(
        `/order/consumer/message/send/${orderId}`,
        { message: newMessage.trim() },
        { token }
      );
      if (status === 'success') {
        setNewMessage('');
        fetchMessages();
      } else {
        alert('Failed to send message');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <MobileLayout showNav activeTab="orders">
      <PageHeader title={`Order #${orderId}`} />
      <ScreenContainer className="flex-1 flex flex-col">
        {/* Loading / Empty State */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size={48} className="text-primary" />
          </div>
        ) : messages.length === 0 ? (
          <EmptyState
            icon="💬"
            title="No messages yet"
            description="Start a conversation with the vendor about your order."
            className="flex-1"
          />
        ) : (
          /* Messages List */
          <div className="flex-1 overflow-y-auto space-y-3">
            {messages.map(msg => {
              const isMine = msg.sender_phone === userPhone;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      isMine
                        ? 'bg-primary text-white'
                        : 'bg-background-soft text-text-primary'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs text-secondary mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Input Area */}
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2 pt-2 border-t border-[var(--divider)]"
        >
          <Input
            placeholder="Type your message…"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            className="flex-1"
            rows={1}
          />
          <Button type="submit" disabled={sending || !newMessage.trim()}>
            {sending ? <Spinner size={20} className="text-white" /> : 'Send'}
          </Button>
        </form>
      </ScreenContainer>
    </MobileLayout>
  );
}
