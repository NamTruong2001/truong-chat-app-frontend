import {MessengerHeader} from "./MessengerHeader";
import {MessengerContent} from "./MessengerContent";
import {Stack} from "@mui/material";
// import {createContext, useState} from 'react';

// export const MessageContext = createContext("");

export const MessengerPage = () => {
    return (
        <Stack container style={{height: "100%"}}>
            <MessengerHeader/>
            <MessengerContent/>
        </Stack>
    )
}