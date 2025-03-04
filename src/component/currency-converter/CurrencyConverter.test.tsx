import {render, screen} from "../../config/testUtils";
import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import '@testing-library/jest-dom'

describe('CurrencyConverter', () => {

    it('renders with loading', async () => {
        render(<CurrencyConverter currencies={[]}/>);
        expect(screen.getByText('Currency converter')).toBeInTheDocument();
    });
});