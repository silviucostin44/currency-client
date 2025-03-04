import './CurrencyConverter.css';
import {Currency} from "../../model/currency";
import CurrencySelector from "../currency-selector/CurrencySelector";
import {Button, Chip, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import i18next from "i18next";
import useSWRMutation from "swr/mutation";
import {fetcher} from "../../config/fetcher";


export default function CurrencyConverter({currencies}: { currencies: Currency[] }) {
    const [baseCurrency, setBaseCurrency] = useState<string>('');
    const [quoteCurrency, setQuoteCurrency] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    const {trigger, data, error} =  // todo: catch error
        useSWRMutation<number>(`/convert/${baseCurrency}/${quoteCurrency}?amount=${amount}`, fetcher);

    function handleAmountInsert(event: ChangeEvent<HTMLInputElement>) {
        setAmount(Number.parseFloat(event.target.value));
    }

    function isButtonDisabled() {
        return baseCurrency === '' || quoteCurrency === '' || amount === 0;
    }

    function formatCurrency() {
        if (!data) {
            return '';
        }
        return i18next.t('format_currency', {
            value: data,
            formatParams: {value: {currency: quoteCurrency, locale: 'en-US', maximumFractionDigits: 6}}
        });
    }

    return (
        <div className="container">
            <h2 className="title">Currency converter</h2>
            <div className="currency-line">
                <CurrencySelector currencies={currencies}
                                  name="from"
                                  onSelect={setBaseCurrency}></CurrencySelector>
                <TextField
                    required
                    id="base-input"
                    type="number"
                    error={false}
                    onChange={handleAmountInsert}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                        htmlInput: {
                            min: 0
                        }
                    }}
                />
            </div>
            <div className="currency-line">
                <CurrencySelector currencies={currencies}
                                  name="to"
                                  onSelect={setQuoteCurrency}></CurrencySelector>
                <TextField
                    id="quote-input"
                    value={formatCurrency()}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />
            </div>
            <Button className="button" onClick={() => trigger()} disabled={isButtonDisabled()}
                    variant="contained" size="large">Convert</Button>
            <ErrorMessage isError={error}></ErrorMessage>
        </div>
    )
}

function ErrorMessage({isError}: { isError: boolean }) {
    if (isError) {
        return <Chip label="There was an error converting. Please try again."
                     variant="outlined" color="error" size="small"/>;
    }
    return null;
}