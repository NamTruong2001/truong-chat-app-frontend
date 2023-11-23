import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {loginRoutes, privateRoutes} from "./routes";
import {DefaultLayout} from "./Layout";
import {AuthContextProvider, useAuth} from "./context/AuthContext";
import './infra/http';
import {ConversationContextProvider} from "./context/ConversationContext";
import {SocketProvider} from "./context/SocketContext";

function PrivateRoute({layout: Layout, component: Component, ...rest}) {
    const {user} = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                ) : (
                    <Redirect to="/login"/>
                )
            }
        />
    );
}

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Switch>
                    {loginRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route key={index} path={route.path}>
                                <Page/>
                            </Route>
                        );
                    })}
                    <ConversationContextProvider>
                        <SocketProvider>
                            {privateRoutes.map((route, index) => {
                                const Layout = route.layout || DefaultLayout;
                                const Page = route.component;
                                return (
                                    <Route key={index} path={route.path} layout={Layout} component={Page}>
                                        <Layout>
                                            <Page/>
                                        </Layout>
                                    </Route>
                                );
                            })}
                        </SocketProvider>
                    </ConversationContextProvider>
                </Switch>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
