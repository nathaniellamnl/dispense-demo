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

    it("alert should show if there's a request/server error", () => {
        resData.data.patients
        global.fetch = jest.fn(()=> {
            Promise.resolve({
                json: () => Promise.resolve({data:{}}) 
            })
        });

        // const mockSuccessResponse = {
        //     data: [
        //       {
        //         userId: 1,
        //         id: 1,
        //         title: 'My First Album'
        //       },
        //       {
        //         userId: 1,
        //         id: 2,
        //         title: 'Album: The Sequel'
        //       }
        //     ]
        //   };
        // const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        // const mockFetchPromise = Promise.resolve({ // 3
        //     json: () => mockJsonPromise,
        // });
        // jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4


        // process.nextTick(() => { // 6
        //     expect(wrapper.find()).toEqual({
                
        //     });

        //     global.fetch.mockClear(); // 7
        //     done(); // 8
        // });
    });

});



