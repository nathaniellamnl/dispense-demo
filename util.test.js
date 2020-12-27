// const {validateField} = require('./src/components/DrugInfoEntry/DrugInfoEntry');

// test('should invalidate empty input', ()=>{
//     const result = validateField("");
//     expect(result).toBe(true);
// });

const React = require('react')
const DrugInfoEntry =require('./src/components/DrugInfoEntry/DrugInfoEntry');

const {mount} = require ('enzyme');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({adapter: new Adapter()});


describe('DrugInfoEntry', ()=> {
    it('works', ()=> {
        expect(2+2).toBe(4);
    })
})

