import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import './ChatPage.css';

export class ChatPage extends Component {

    inputRef = createRef();

    state = {
        messages: []
    };

    componentDidMount() {
        this.props.chat.onMessage(this.handleMessage);
        this.props.chat.onKickout(this.handleKickout);
    }

    componentWillUnmount() {
        this.props.chat.removeListeners();
    }

    render() {
        return (
            <div className="ChatPage">
                <ul className="ChatPage-messages">
                    {this.state.messages.map((message, i) => (
                        <li key={i}>{message}</li>
                    ))}
                </ul>
                <div className="ChatPage-form">
                    <form>
                        <input
                            ref={this.inputRef}
                            placeholder="Enter message"
                            autoFocus="on"
                            onKeyPress={this.handleInputKeyPress}
                        />
                        <button onClick={this.handleSendClick}>Send</button>
                    </form>
                    <button onClick={this.handleLeaveClick}>
                        Leave chat
                    </button>
                </div>
            </div>
        );
    }

    handleMessage = message => {
        this.setState(state => ({
            messages: state.messages.concat(message),
        }));
    }

    handleKickout = (reason) => {
        this.props.setError(reason);
        this.props.history.replace('/');
    }

    handleInputKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSendClick(e)
        }
    }

    handleSendClick = e => {
        e.preventDefault();
        const inputEl = this.inputRef.current;

        this.props.chat.sendMessage(inputEl.value);
        inputEl.value = '';
        inputEl.focus();
    }

    handleLeaveClick = e => {
        e.preventDefault();
        this.props.chat.leave();
        this.props.history.replace('/');
    }

}

export default withRouter(ChatPage);