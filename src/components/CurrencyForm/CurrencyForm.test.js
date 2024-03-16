import CurrencyForm from './CurrencyForm.js';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';

describe('Component CurrencyForm', () => {
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => { }} />);
    });
    it('should run action callback with proper data on form submit', () => {
        const action = jest.fn();

        // render component
        render(<CurrencyForm action={action} />);

        // find “convert” button
        const submitButton = screen.getByText('Convert');

        // simulate user click on "convert" button
        userEvent.click(submitButton);

        // check if action callback was called once
        expect(action).toHaveBeenCalledTimes(1);
    });
    it('should pass when correct arguments are passed via action function', () => {
        const action = jest.fn();

        // render component
        render(<CurrencyForm action={action} />);

        // prepare access to elements
        const amountField = screen.getByTestId('amount');
        const fromField = screen.getByTestId('from');
        const toField = screen.getByTestId('to');
        const submitButton = screen.getByText('Convert');

        // set test values to fields
        userEvent.type(amountField, '100');
        userEvent.selectOptions(fromField, 'PLN');
        userEvent.selectOptions(toField, 'USD');
        userEvent.click(submitButton);

        // check if action callback was called once and with proper argument
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith({ amount: 100, from: 'PLN', to: 'USD' });
    });

    it('should pass when correct arguments for several test cases', () => {

        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '20', from: 'USD', to: 'PLN' },
            { amount: '200', from: 'PLN', to: 'USD' },
            { amount: '345', from: 'USD', to: 'PLN' },
        ];

        for (const testObj of testCases) {
            const action = jest.fn();

            // render component
            render(<CurrencyForm action={action} />);

            // prepare access to elements
            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from');
            const toField = screen.getByTestId('to');
            const submitButton = screen.getByText('Convert');

            // set test values to fields
            userEvent.type(amountField, testObj.amount);
            userEvent.selectOptions(fromField, testObj.from);
            userEvent.selectOptions(toField, testObj.to);
            userEvent.click(submitButton);

            // check if action callback was called once and with proper argument
            expect(action).toHaveBeenCalledTimes(1);
            expect(action).toHaveBeenCalledWith({...testObj});
            // unmount component
            cleanup();
        }
    })

});

