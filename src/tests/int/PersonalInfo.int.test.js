import React from 'react';
import { render, screen, act } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import PersonalInfo from '../../components/Patient/PersonalInfo/PersonalInfo';


describe('Check scenarios when the submit button is clicked', () => {
    let createButton;
    beforeEach(() => {
        render(<PersonalInfo routeName="/patient/new" />);
        const caseCode = screen.getByLabelText("Case Code:", { selector: 'input' });
        userEvent.type(caseCode, "123")
        const age = screen.getByLabelText("Age:", { selector: 'input' });
        userEvent.type(age, "40");
        const contactNumber = screen.getByLabelText("Contact Number:", { selector: 'input' });
        userEvent.type(contactNumber, "852163");
        createButton = screen.getByRole('button', { name: /create/i });
        expect(createButton).toBeInTheDocument();
    })

    it("success modal should show when Promise resolves", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ error: false })
            })
        );
        await act(async () => userEvent.click(createButton));
        expect(screen.queryByText('Invalid')).toBe(null);
        window.alert = jest.fn();
        expect(screen.queryAllByText("Success!")).not.toBe(null);
    })

    it("alert should show when Promise is rejected", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.reject({ error: true })
            })
        );
        await act(async () => userEvent.click(createButton));
        expect(screen.queryByText('Invalid')).toBe(null);
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        expect(window.alert).toHaveBeenCalledTimes(1);
    })


})




