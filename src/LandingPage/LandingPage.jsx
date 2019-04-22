import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import './LandingPage.css';

export class LandingPage extends Component {

    inputRef = createRef();

    render() {
        const { error } = this.props;

        return (
            <div className="LandingPage">
                <form>
                    <input
                        ref={this.inputRef}
                        placeholder="Nickname"
                        autoComplete="off"
                        autoFocus="on"
                    />
                    <button onClick={this.onJoinClick}>Join</button>
                </form>
                {error && (
                    <div className="LandingPageError">{this.getErrorMessage(error)}</div>
                )}
            </div>
        );
    }

    getErrorMessage(error) {
        switch(error) {
            case 'NICKNAME_TAKEN':
                return 'Failed to connect. Nickname already taken.';
            case 'NICKNAME_SYMBOLS':
                return 'Failed to connect. Nickname can contain latin letters and digits.';
            case 'NICKNAME_MIN_LENGTH':
                return 'Failed to connect. Nickname length can not be less than 3 characters.';
            case 'NICKNAME_MAX_LENGTH':
                return 'Failed to connect. Nickname length can not be greater than 16 characters.';
            case 'SERVER_UNAVAILABLE':
                return 'Failed to connect. Server unavailable.';
            case 'SERVER_SHUTDOWN':
                return 'Disconnected by the server due to shutdown.';
            case 'USER_INACTIVITY':
                return 'Disconnected by the server due to inactivity.';
            default:
                return error;
        }
    }

    onJoinClick = e => {
        e.preventDefault();
        const inputEl = this.inputRef.current;
        const nickname = inputEl.value;

        this.props.chat.join(nickname, error => {
            if (error) {
                this.props.setError(error);
                inputEl && inputEl.focus();
            } else {
                this.props.setError(null);
                this.props.history.replace('/chat');
            }


        });
    }
}

export default withRouter(LandingPage);