import {Stack, styled, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import PhotoIcon from '@mui/icons-material/Photo';
import {useRef, useState} from "react";


const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTextarea = styled("textarea")(
    ({theme}) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

function EmptyTextarea({text, setText, addMessage}) {

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (!text) {
                event.preventDefault(); // Prevent adding a newline character
                return;
            }
            addMessage(text)
            setText('')
            event.preventDefault();
        }
    }

    return <StyledTextarea id="messageInput"
                           aria-label="empty textarea" placeholder="Empty" maxRows={2} value={text}
                           onChange={handleTextChange}
                           onKeyDown={handleOnKeyDown}/>;
}

function ChatInputBar({addMessage, onSubmit}) {
    const [text, setText] = useState('');

    function handleSubmitMessage() {
        if (!text) {
            return
        }

        addMessage(text)
        setText('')

        return onSubmit()
    }

    return (
        <Stack direction={"row"} width={'100%'} height={"7%"} alignItems={"center"} padding={1}>
            <Box padding={1}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <SendIcon onClick={handleSubmitMessage}/>
                </IconButton>
            </Box>
            <EmptyTextarea text={text} setText={setText} addMessage={addMessage}/>
             <Stack direction={"row"} paddingLeft={1.5}>
                 <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                     <AttachFileIcon/>
                 </IconButton>
                 <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                     <PhotoIcon/>
                 </IconButton>
                 <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                     <KeyboardVoiceIcon/>
                 </IconButton>
             </Stack>
        </Stack>
    )
}

export default ChatInputBar