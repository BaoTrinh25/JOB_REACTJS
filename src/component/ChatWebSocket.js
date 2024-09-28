import { useEffect, useState } from 'react';

export const useChatWebSocket = (jobId, currentChatUser, user) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!currentChatUser || user?.role !== 0) return;

        const ws = new WebSocket(`ws://localhost:8000/ws/chat/${jobId}/`);
        setSocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error', error);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [currentChatUser, jobId, user]);

    const sendMessage = (input, setInput) => {
        if (socket && input) {
            const message = {
                message: input,
                sender_id: user.id,
                receiver_id: currentChatUser.id,
                sender: user,
                jobId: jobId,
            };
            socket.send(JSON.stringify(message));
            setInput("");
        }
    };

    return { messages, sendMessage };
};
