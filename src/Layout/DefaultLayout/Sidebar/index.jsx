import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import {useEffect, useRef, useState} from "react";
import {useAuth} from "../../../context/AuthContext";
import {getConversations} from "../../../api/conversation";
import {useConversation} from "../../../context/ConversationContext";

export function Sidebar() {
    const ref = useRef(null);
    const {conversations, setConversations, setChosenConversation} = useConversation()
    const {user} = useAuth()

    const getConversationTitle = (title, participants, type) => {
        if (title) {
            return title
        }
        // if (type === "group") {
        //     const otherUsers = participants.filter(participant => participant.user.id !== user.id)
        //     return
        // }
        if (type === "private") {
            const userDetail = participants.filter(participant => participant.user.id !== user.id)[0]["user"]
            return `${userDetail["first_name"]} ${userDetail["last_name"]}`
        }
    }

    const chooseConversation = (id) => {
        const con = conversations.find(con => con.id === id)
        setChosenConversation(con)
    }

    const isUserMessage = (message) => {
        if (message["sender_id"] === user.id) {
            return `You: ${message.message}`
        }
        return message.message
    }


    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
    }, []);

    return (
        <Box sx={{pb: 7, border: 1, borderColor: 'grey.400', height:"100%"}} ref={ref}>
            <CssBaseline/>
            <List>
                {conversations.map(({id, title, messages, participants, type}) => (
                    <ListItem button key={id} onClick={() => chooseConversation(id)}>
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture">
                                {id}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                getConversationTitle(title, participants, type)
                            }
                            secondary={messages.length > 0 ? isUserMessage(messages[0]) : ''}
                        />
                    </ListItem>
                ))}
            </List>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
            </Paper>
        </Box>
    );
}
