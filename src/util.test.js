import React from 'react';
import { cleanup } from "@testing-library/react";
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PersonalInfo from './components/Patient/PersonalInfo/PersonalInfo';
import DrugInfoEntry from './components/DrugInfoEntry/DrugInfoEntry';
Enzyme.configure({ adapter: new Adapter() });


describe('PersonalInfo', () => {

    afterEach(cleanup);

    let wrapper;
    beforeEach(() => {
        wrapper = mount(<PersonalInfo />);
    })

    it('invalid msg should show when case code,age,contact number are empty', () => {

        const button = wrapper.find("button").last();
        button.simulate('click');

        wrapper.update();
        expect(wrapper.find("p").last().text()).toEqual("Invalid");
    })

    it('invalid msg should not show when case code && age && contact number are not empty', () => {
        const caseCode = wrapper.find("#caseCode");
        caseCode.simulate('change', { target: { value: 'ABC132' } });
        const age = wrapper.find("#age");
        age.simulate('change', { target: { value: '60' } });
        const contactNumber = wrapper.find("#contactNumber");
        contactNumber.simulate('change', { target: { value: 85274163 } });

        const button = wrapper.find("button").last();
        button.simulate('click');

        expect(wrapper.find('.errorMsg').exists()).toBe(false);
    })

});


describe('DrugInfoEntry', () => {
    let entryChangeHandler = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<DrugInfoEntry id="testing" entryChangeHandler={entryChangeHandler} />)
    })

    describe('the user populates the input', () => {
        const item = "Aspirin 80mg";
        beforeEach(() => {
            const textArea = wrapper.find('textarea').first();
            textArea.simulate('change', {
                target: { value: item }
            })
        })

        it('should reflect what the user has typed', () => {
            console.log(wrapper.debug());
            const textArea = wrapper.find('textarea').first();
            expect(textArea.props().value).toBe("Aspirin 80mg");
        })

    })

})
