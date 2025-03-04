import './CurrencyConverter.css';
import {Currency} from "../../model/currency";
import CurrencySelector from "../currency-selector/CurrencySelector";
import {Button, Chip, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import useSWRMutation from "swr/mutation";
import {fetcher} from "../../config/fetcher";
import formatCurrency from "./currencyFormatter";
import {ErrorCodes} from "../../error-handling/errorCodes";
import {ErrorMessages} from "../../error-handling/errorMessages";
import {AxiosError} from "axios";


export default function CurrencyConverter({currencies}: { currencies: Currency[] }) {
    const [baseCurrency, setBaseCurrency] = useState<string>('');
    const [quoteCurrency, setQuoteCurrency] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    const {trigger, data, error} =
        useSWRMutation<number>(`/convert/${baseCurrency}/${quoteCurrency}?amount=${amount}`, fetcher);

    function handleAmountInsert(event: ChangeEvent<HTMLInputElement>) {
        setAmount(Number.parseFloat(event.target.value));
    }

    function isButtonDisabled() {
        return baseCurrency === '' || quoteCurrency === '' || amount === 0;
    }

    return (
        <div className="container">
            <h2 className="title">Currency converter</h2>
            <div className="currency-line">
                <CurrencySelector currencies={currencies}
                                  name="from"
                                  data-testid="base-selector"
                                  onSelect={setBaseCurrency}/>
                <TextField
                    required
                    id="base-input"
                    type="number"
                    onChange={handleAmountInsert}
                    data-testid="amount-input"
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
                                  data-testid="quote-selector"
                                  onSelect={setQuoteCurrency}/>
                <TextField
                    id="quote-input"
                    value={formatCurrency(data, quoteCurrency)}
                    data-testid="converted-amount-input"
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />
            </div>
            <Button className="button" onClick={() => trigger()} disabled={isButtonDisabled()}
                    variant="contained" size="large">Convert</Button>
            <ErrorMessage error={error}/>
        </div>
    )
}

function ErrorMessage({error}: { error: AxiosError }) {
    if (error) {
        const label = (error.response?.data as string).startsWith(ErrorCodes.UNSUPPORTED_CURRENCY)
            ? ErrorMessages.UNSUPPORTED_CURRENCY_MESSAGE
            : ErrorMessages.GENERAL_ERROR_MESSAGE;

        return <Chip label={label}
                     variant="outlined" color="error" size="small"/>;
    }
    return null;
}