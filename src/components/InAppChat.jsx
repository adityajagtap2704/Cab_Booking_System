import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const InAppChat = ({ participantName, participantAvatar }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi there! I am on my way.', sender: 'driver', time: '10:30 AM' },
    { id: 2, text: 'Great, I am waiting at the main entrance.', sender: 'passenger', time: '10:31 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'passenger', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col h-[400px]"
    >
      <div className="p-3 bg-gray-50 border-b flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={participantAvatar} alt={participantName} />
          <AvatarFallback>{participantName ? participantName.charAt(0) : 'D'}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{participantName || 'Driver'}</h3>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      <ScrollArea className="flex-grow p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'passenger' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender === 'passenger'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'passenger' ? 'text-blue-100' : 'text-gray-500'} text-right`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-3 border-t bg-gray-50 flex items-center space-x-2">
        <Button variant="ghost" size="icon" type="button">
          <Paperclip className="h-5 w-5 text-gray-500" />
        </Button>
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" size="icon">
          <Send className="h-5 w-5" />
        </Button>
      </form>
      <p className="text-xs text-center text-muted-foreground py-1 bg-gray-50">
        This is a UI mockup for In-App Chat. Real-time messaging requires backend (e.g. Socket.io).
      </p>
    </motion.div>
  );
};

export default InAppChat;