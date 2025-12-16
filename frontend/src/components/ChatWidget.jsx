import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { sendChatMessage } from '../services/api';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your medical assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await sendChatMessage(userMessage);
            setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-healthcare-primary hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all transform hover:scale-110"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-xl shadow-2xl w-80 sm:w-96 flex flex-col h-[500px] border border-gray-200">
                    {/* Header */}
                    <div className="bg-healthcare-primary text-white p-4 rounded-t-xl flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <MessageCircle size={20} />
                            <span className="font-semibold">Medical Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                            ? 'bg-healthcare-primary text-white rounded-br-none'
                                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-lg border border-gray-200 rounded-bl-none shadow-sm">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question..."
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-healthcare-primary text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
