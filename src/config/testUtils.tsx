import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import {SWRConfig} from "swr";
import {fetcher} from "./fetcher";

const AllTheProviders = ({children}: { children: React.ReactNode }) => {
    return (
        <React.StrictMode>
            <SWRConfig value={{fetcher}}>
                {children}
            </SWRConfig>
        </React.StrictMode>
    )
}

const testRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {testRender as render}