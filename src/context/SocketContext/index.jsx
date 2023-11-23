// src/context/SocketContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import io from 'socket.io-client';
import {useAuth} from "../AuthContext";
import {useConversation} from "../ConversationContext";


const URL = process.env.NODE_ENV === 'production' ? undefined : 'ws://localhost:8000';
const SocketContext = createContext(null);

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({children}) {
    const [socket, setSocket] = useState(null);
    const {user} = useAuth()
    const {chosenConversation, setMessage} = useConversation()


    function addMessage(messageContent) {
        const message = {
            "message": messageContent,
            "sender_id": user.id,
            "conversation_id": chosenConversation.id,
            "user": user,
            "message_type": "text"
        }
        // setMessage([...messages, message])

        const messageToEmit = {
            ...message,
        }
        delete messageToEmit.sender_id
        delete messageToEmit.user
        socket.emit("message", messageToEmit)
    }

    const handleMessage = (message) => {
        console.log(chosenConversation)
        if (message.conversation_id === chosenConversation.id) {
            setMessage((prevState) => [...prevState, message]);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (!socket) {
            const newSocket = io(URL, {
                auth: {
                    HTTP_TOKEN: token
                }
            });

            newSocket.on("error", (error) => {
                console.log(error)
            });


            setSocket(newSocket);
        }

    }, [socket, user]);


    useEffect(() => {
        if (socket) {
            socket.on("message", handleMessage)

            return () => {
                if (socket) {
                    socket.off('message', handleMessage);
                }
            };
        }
    }, [chosenConversation, socket]);

    return (
        <SocketContext.Provider value={{socket, addMessage}}>{children}</SocketContext.Provider>
    );
}
