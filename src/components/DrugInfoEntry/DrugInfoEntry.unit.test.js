import React from 'react';
import { render,screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import DrugInfoEntry from './DrugInfoEntry';


describe('form should reflect user input', () => {
    let entryChangeHandler = jest.fn();

    const { queryByLabelText } = render(<DrugInfoEntry id="testing" entryChangeHandler={entryChangeHandler} id="" />);

    it('should reflect what the user has typed', () => {
        const item = "Aspirin 80mg";
        console.log(screen.debug());
        userEvent.type(queryByLabelText(/Drug Item Name:/i, { selector: "textarea" }), item);
        expect(queryByLabelText(/Drug Item Name:/i, { selector: "textarea" }).textContent).toBe(item);
    })
})