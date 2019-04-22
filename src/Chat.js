import socketClient from 'socket.io-client';

class Chat {

    constructor(url) {
        this.socket = socketClient(url);
    }

    join(nickname, callback) {
        if (this.socket.disconnected) {
            this.socket.connect();
        }

        this.socket.emit('chat.join', { nickname });
        this.socket.once('chat.join_success', () => callback());
        this.socket.once('chat.join_error', ({ error }) => callback(error));
        this.socket.on('connect_error', () => callback('SERVER_UNAVAILABLE'));
    }

    leave() {
        this.socket.emit('chat.leave');
    }

    sendMessage(message) {
        this.socket.emit('chat.message', { message });
    }

    onMessage(callback) {
        this.socket.on("chat.joined", ({ nickname }) => {
            callback(`${nickname} joined`);
        });
        this.socket.on("chat.message", ({ nickname, message }) => {
            callback(`${nickname}: ${message}`);
        });
        this.socket.on("chat.left", ({ nickname, reason }) => {
            callback(this.getLeaveMessage(nickname, reason));
        });
    }

    onKickout(callback) {
        this.socket.on("chat.kickout", ({ reason }) => {
            callback(reason);
        });
    }
    
    removeListeners() {
        this.socket.off();
    }

    getLeaveMessage(nickname, reason) {
        switch (reason) {
            case 'USER_INACTIVITY':
                return `${nickname} was disconnected due to inactivity`;
            case 'CONNECTION_LOST':
                return `${nickname} left the chat, connection lost`;
            default:
                return `${nickname} left the chat`;
        }
    }

}

export default Chat;
