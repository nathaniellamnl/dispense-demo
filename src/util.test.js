import React from 'react';
import DrugInfoEntry from './components/DrugInfoEntry/DrugInfoEntry';

import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});


describe('DrugInfoEntry', ()=> {
    let entryChangeHandler = jest.fn();
    let wrapper;
    
    beforeEach(()=> {
        wrapper = shallow(<DrugInfoEntry id="testing" entryChangeHandler={entryChangeHandler}/>)
    })

    describe('the user populates the input', ()=> {
        const item = "Aspirin 80mg";
        beforeEach(()=>{
            const textArea = wrapper.find('textarea').first();
            textArea.simulate('change', {
                target: {value: item}
            })
        })
       
        it('should reflect what the user has typed', ()=>{
            console.log(wrapper.debug());
            const textArea = wrapper.find('textarea').first();
            expect(textArea.props().value).toBe("Aspirin 80mg");
        })

    })
 
})

