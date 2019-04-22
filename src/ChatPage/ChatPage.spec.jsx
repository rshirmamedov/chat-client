import React from 'react';
import { ChatPage } from './ChatPage';
import { shallow, mount } from 'enzyme';

describe('ChatPage', () => {

    it('should render', () => {
        const wrapper = shallow(<ChatPage chat={{
            onMessage() {},
            onKickout() {},
        }} />);
        expect(wrapper.hasClass('ChatPage')).toBe(true);
    });

    it('should handle chat message', () => {
        let onMessageCallback;
        const chat = {
            onMessage(callback) {
                onMessageCallback = callback;
            },
            onKickout() {}
        };
        const wrapper = shallow(<ChatPage chat={chat}/>);
        expect(wrapper.find('.ChatPage-messages > li').length).toBe(0);
        onMessageCallback('User1 joined the chat');
        onMessageCallback('User2 left the chat');
        onMessageCallback('User3 disconnected due to inactivity');
        expect(wrapper.find('.ChatPage-messages > li').length).toBe(3);
        expect(wrapper.find('.ChatPage-messages > li').at(0).text()).toBe('User1 joined the chat');
        expect(wrapper.find('.ChatPage-messages > li').at(1).text()).toBe('User2 left the chat');
        expect(wrapper.find('.ChatPage-messages > li').at(2).text()).toBe('User3 disconnected due to inactivity');
    });

    it('should handle chat kickout', () => {
        let onKickoutCallback;
        const chat = {
            onMessage() {},
            onKickout(callback) {
                onKickoutCallback = callback;
            }
        };
        const setErrorMock = jest.fn();
        const historyReplaceMock = jest.fn();
        const history = {
            replace: historyReplaceMock,
        }

        shallow(<ChatPage chat={chat} setError={setErrorMock} history={history} />);
        onKickoutCallback('USER_INACTIVITY');
        expect(setErrorMock).toHaveBeenCalledTimes(1);
        expect(setErrorMock).toHaveBeenCalledWith('USER_INACTIVITY')
        expect(historyReplaceMock).toHaveBeenCalledTimes(1);
        expect(historyReplaceMock).toHaveBeenCalledWith('/');
    });
    
});


