import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Badge} from "@mui/material";

export const MessengerHeader = () => {
    return (
        <Box sx={{flexGrow: 1}} paddingBottom={1}>
            <AppBar position={"static"} color={"default"} sx={{border: 1, borderLeft: 0, boxShadow: 6,  borderColor: 'grey.400', backgroundColor: 'white'}}>
                <Toolbar>
                    <Avatar>G</Avatar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}} paddingLeft={1}>
                        News
                    </Typography>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <CallIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <VideocamIcon/>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}