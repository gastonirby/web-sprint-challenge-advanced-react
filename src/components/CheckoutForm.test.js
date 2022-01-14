import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>)

    const checkoutTitle = screen.getByText(/Checkout Form/i);
    const firstName = screen.getByLabelText(/First Name:/i);
    const lastName = screen.getByLabelText(/Last Name:/i);
    const address = screen.getByLabelText(/Address:/i);
    const city = screen.getByLabelText(/City:/i);
    const state = screen.getByLabelText(/State:/i);
    const zip = screen.getByLabelText(/Zip:/i);
    const foo = screen.queryByText(/bar/i);

    expect(foo).toBeFalsy();
    
    expect(checkoutTitle).toBeInTheDocument();
    expect(checkoutTitle).toBeVisible();
    expect(checkoutTitle).toHaveTextContent(/Checkout Form/i);

    expect(firstName).toBeTruthy();
    expect(lastName).toBeTruthy();
    expect(address).toBeTruthy();
    expect(city).toBeTruthy();
    expect(state).toBeTruthy();
    expect(zip).toBeTruthy();
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>)

    const firstName = screen.getByLabelText(/First Name:/i);
    const lastName = screen.getByLabelText(/Last Name:/i);
    const address = screen.getByLabelText(/Address:/i);
    const city = screen.getByLabelText(/City:/i);
    const state = screen.getByLabelText(/State:/i);
    const zip = screen.getByLabelText(/Zip:/i);
    const submitBtn = screen.getByRole('button');
    
    userEvent.type(firstName , 'Gaston');
    userEvent.type(lastName, 'Irby');
    userEvent.type(address, '123 An Address');
    userEvent.type(city, 'Some City');
    userEvent.type(state, 'AA');
    userEvent.type(zip, '12345');
    userEvent.click(submitBtn);

    const successMessage = screen.getByTestId(/successMessage/i);

    expect(successMessage).toBeInTheDocument();
    expect(successMessage).toBeVisible();
    expect(successMessage).toHaveTextContent(/You have ordered some plants! Woo-hoo!/i);
    expect(successMessage).toHaveTextContent(/Your new green friends will be shipped to:/i);
    expect(successMessage).toHaveTextContent(/Gaston/i);
    expect(successMessage).toHaveTextContent(/Irby/i);
    expect(successMessage).toHaveTextContent(/123 An Address/i);
    expect(successMessage).toHaveTextContent(/Some City/i);
    expect(successMessage).toHaveTextContent(/AA/i);
    expect(successMessage).toHaveTextContent(/12345/i);
});