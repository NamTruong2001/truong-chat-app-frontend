import {Header} from "./Header";
import {Sidebar} from "./Sidebar";
import {Grid} from "@mui/material";
import {ConversationContextProvider} from "../../context/ConversationContext";


const styles = {
    sidebar: {
        height: '100vh', // Set the height to cover the entire viewport vertically
        overflowY: 'scroll', // Add scroll if the content exceeds the height
    },
};

export function DefaultLayout({children}) {
    return (
        <div>
            <Header/>
                <Grid container>
                    <Grid item xs={3}>
                        <div style={styles.sidebar}>
                            <Sidebar/>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        {children}
                    </Grid>
                </Grid>
        </div>
    )
}