import './App.css';
import {Currency} from "./model/currency";
import CurrencyConverter from "./component/currency-converter/CurrencyConverter";
import {Alert, CircularProgress} from "@mui/material";
import useSWRImmutable from "swr/immutable";


export default function App() {

    return <div className="app">
        <AppContent/>
    </div>;
}

function AppContent() {
    const {data, isLoading} = useSWRImmutable<Currency[]>(`/currencies`);

    if (isLoading) return <CircularProgress className="on-center" size="5rem"/>;
    if (!data) return <Alert className="on-center" severity="error">We are sorry. The service is currently
        unavailable.</Alert>;

    return <CurrencyConverter currencies={data}/>;
}