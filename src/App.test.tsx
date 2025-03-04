import React from 'react';
import App from './App';
import {api} from "./config/fetcher";
import '@testing-library/jest-dom'
import {render, screen} from "./config/testUtils";


describe('App', () => {

    it('renders with loading', async () => {
        render(<App/>);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders with error', async () => {
        jest.spyOn(api, 'get').mockRejectedValueOnce({});
        render(<App/>);

        await screen.findByRole('alert');

        const linkElement = screen.getByText(/We are sorry. The service is currently unavailable/i);
        expect(linkElement).toBeInTheDocument();
    });
})

it('renders with currencies', async () => {
    jest.spyOn(api, 'get').mockResolvedValueOnce({data: []});
    render(<App/>);

    await screen.findByText('Currency converter');

    expect(screen.getByText('Currency converter')).toBeInTheDocument();
    expect(screen.getAllByText('from').length).toBe(2);
    expect(screen.getAllByText('to').length).toBe(2);
    expect(screen.getAllByRole('button').at(-1)).toBeDisabled();
});