import React from 'react';
import { shallow } from 'enzyme';
import  { LoginPage } from '../../components/LoginPage';


test('Should correctly render loginpage', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
})