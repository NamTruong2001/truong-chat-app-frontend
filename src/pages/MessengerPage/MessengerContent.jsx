import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {useEffect, useRef, useState} from "react";
import ChatInputBar from "./ChatInputBar";
import {useAuth} from "../../context/AuthContext";
import {useConversation} from "../../context/ConversationContext";
import {getMessagesByConversation} from "../../api/conversation";
import {useSocket} from "../../context/SocketContext";


export const MessengerContent = () => {
    const {user} = useAuth()
    const {messages, setMessage, currentPage, setCurrentPage, chosenConversation} = useConversation()
    const {addMessage} = useSocket()
    const containerRef = useRef(null)

    const paginateMessage = async (page) => {
        try {
            // console.log(currentPage)
            const {data} = await getMessagesByConversation(chosenConversation.id, currentPage + 1)
            setCurrentPage(prevState => prevState + 1)
            // setMessage(prevState => [...data.slice().reverse(), ...prevState]);
            return data
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (container) {
                if (container.scrollTop === 0) {
                    // Scroll bar reached the top, fetch more messages
                    if (chosenConversation) {
                        getMessagesByConversation(chosenConversation.id, currentPage + 1)
                            .then(
                                response => {
                                    setCurrentPage(prevState => prevState + 1)
                                    setMessage(prevState => [...response.data.slice().reverse(), ...prevState]);
                                }
                            )
                            .catch(error => console.log(error))
                    }
                }
            }
        };

        // Add the scroll event listener to the chat container
        containerRef.current.addEventListener('scroll', handleScroll);

        return () => {
            // Remove the scroll event listener when the component unmounts
            containerRef.current.removeEventListener('scroll', handleScroll);
        };
    }, [])

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                console.log(chosenConversation.id)
                const {data} = await getMessagesByConversation(chosenConversation.id, currentPage)
                setMessage(data.slice().reverse())
            } catch (e) {
                console.log(e)
            }
        }
        fetchMessage()
    }, [chosenConversation, currentPage])


    function getUserFullname(user) {
        if (user) {
            return `${user["first_name"]} ${user["last_name"]}`
        }
        return "No"
    }

    function getChatContent(message_type, attachment) {
        switch (message_type) {
            case "image":

                break;
            case "video":
                break;
            case "document":
                break;
            case "voice":
                break;
            default:
                break
        }
    }

    return (
        <>
            <Box style={{
                height: '90%', marginBottom: 1, padding: '0 10px'
            }}>
                <Box id="chatContainer" height={"100%"} sx={{overflowY: 'scroll', height: '83vh'}} ref={containerRef}>
                    {
                        messages.map(
                            (message, index) => {
                                if (message["message_type"] === "system") {
                                    return (
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'row'
                                        }} key={message.id}>
                                            <Typography>{message.message}</Typography>
                                        </Box>
                                    )
                                }

                                if (message["sender_id"] === user.id) {

                                    return <Box width={"100%"} key={message.id}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: "end",
                                            padding: 0.2,
                                            height: "auto"
                                        }}>
                                            <Typography variant="caption" display="block">
                                                {
                                                    getUserFullname(message.user)
                                                }
                                            </Typography>
                                            <Typography sx={{
                                                borderRadius: '16px',
                                                padding: 1,
                                                marginLeft: 1,
                                                bgcolor: 'primary.main',
                                                color: 'primary.contrastText',
                                                maxWidth: '40%',
                                                wordWrap: 'break-word'
                                            }}>{message.message}</Typography>
                                            {

                                            }
                                        </Box>
                                    </Box>
                                } else {
                                    return <Box width={"auto"} key={message.id}>
                                        <Box>
                                            <Typography variant="caption" display="block">
                                                {
                                                    getUserFullname(message.user)
                                                }
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    borderRadius: '50%',
                                                    padding: 0.5
                                                }}>
                                                <Avatar>G</Avatar>
                                                <Typography sx={{
                                                    borderRadius: '16px',
                                                    padding: 1,
                                                    marginLeft: 1,
                                                    bgcolor: 'text.disabled',
                                                    color: 'primary.contrastText',
                                                    maxWidth: '40%',
                                                    wordWrap: 'break-word'
                                                }}>{message.message}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                }
                            }
                        )
                    }
                </Box>
            </Box>
            <ChatInputBar ref={containerRef} onSubmit={() => {
            }} addMessage={addMessage}/>
        </>
    )
}


// function Chat(props) {
//     return <Box width={"100%"} key={index}>
//         <Box sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: "end",
//             padding: 0.2,
//             height: "auto"
//         }}>
//             <Typography variant="caption" display="block">
//                 {
//                     getUserFullname(message.user)
//                 }
//             </Typography>
//             <Typography sx={{
//                 borderRadius: '16px',
//                 padding: 1,
//                 marginLeft: 1,
//                 bgcolor: 'primary.main',
//                 color: 'primary.contrastText',
//                 maxWidth: '40%',
//                 wordWrap: 'break-word'
//             }}>{message.message}</Typography>
//
//         </Box>
//     </Box>
// }