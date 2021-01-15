import React from 'react';
import { render, act } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route } from 'react-router-dom';

import Signin from '../../auth/Signin';

test("Should navigate to home page after pressing the signin button", async () => {
    const { 
        container,
        queryByText
      } = render(
        <BrowserRouter>
          <Signin />
          <Route path="/">Home</Route>
        </BrowserRouter>
      );
    
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                data: {
                    login: {
                        token: "mockToken",
                        userId: "mockId",
                        tokenExpiration: "1h"
                    }
                }
            })
        })
    );
    await act(async() => userEvent.click(queryByText(/sign in/i, { selector: "button" })));
    expect(container).toHaveTextContent(/home/i);
})


