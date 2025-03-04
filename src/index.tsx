import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './config/i18n';
import App from './App';
import reportWebVitals from './config/reportWebVitals';
import {SWRConfig} from "swr";
import {fetcher} from "./config/fetcher";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <SWRConfig value={{fetcher}}>
            <App/>
        </SWRConfig>
    </React.StrictMode>
);

reportWebVitals();
