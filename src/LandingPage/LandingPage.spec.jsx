import React from 'react';
import { LandingPage } from './LandingPage';
import { shallow, mount } from 'enzyme';

describe('LandingPage', () => {

    it('should render', () => {
        const wrapper = shallow(<LandingPage />);
        expect(wrapper.hasClass('LandingPage')).toBe(true);
    });

    it('should render without error', () => {
        const wrapper = shallow(<LandingPage />);
        expect(wrapper.exists('.LandingPageError')).toBe(false);
    });

    it('should render with error', () => {
        const wrapper = shallow(<LandingPage error="NICKNAME_TAKEN" />);
        expect(wrapper.exists('.LandingPageError')).toBe(true);
    });

    it('should join chat on button click', () => {
        const joinMock = jest.fn();
        const wrapper = mount(<LandingPage chat={{ join: joinMock }} error="NICKNAME_TAKEN" />);
        wrapper.find('button').simulate('click', { preventDefault() {} });
        expect(joinMock).toHaveBeenCalledTimes(1);
    });
});


