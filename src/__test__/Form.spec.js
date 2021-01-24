import React from 'react';
import Form from '../components/Form';
import { shallow, mount } from 'enzyme';

it("Form rendered correctly", () => {
    const wrapper = mount(<Form />);
    expect(wrapper.state("error")).toEqual(null)
})

