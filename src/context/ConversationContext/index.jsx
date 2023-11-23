import React, {
    useContext, useEffect, useState,
} from 'react';
import {getConversations, getMessagesByConversation} from "../../api/conversation";
import {useAuth} from "../AuthContext";
import {useSocket} from "../SocketContext";

export const ConversationContext = React.createContext(null);

export const useConversation = () => useContext(ConversationContext);

export function ConversationContextProvider({children}) {
    const {user} = useAuth()
    // const {socket} = useSocket()
    const [conversations, setConversations] = useState([]);
    const [chosenConversation, setChosenConversation] = useState(null)
    const [messages, setMessage] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const fetchConversations = async () => {
        try {
            const response = await getConversations();
            const data = response.data
            setConversations(data);
            setChosenConversation(data[0])
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);


    return (
        <ConversationContext.Provider value={{
            conversations,
            setConversations,
            chosenConversation,
            setChosenConversation,
            messages,
            setMessage,
            currentPage,
            setCurrentPage
        }
        }>
            {children}
        </ConversationContext.Provider>
    );
}