import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ChatPage from './ChatPage';
import Chat from './Chat';
import config from './config';
import './App.css';

const chat = new Chat(config.serverUrl);

class App extends Component {
    
    state = {
        error: null,
    }
    
    render() {
        return (
            <BrowserRouter>
                <Route path="/" exact render={() => (
                    <LandingPage
                        chat={chat}
                        error={this.state.error}
                        setError={this.setError}
                    />
                )}/>
                <Route path="/chat" exact render={() => (
                    <ChatPage
                        chat={chat}
                        setError={this.setError}
                    />
                )} />
            </BrowserRouter>
        );
    }

    setError = error => {
        this.setState({ error });
    }
}

export default App;
