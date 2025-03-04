import {Currency} from "../../model/currency";
import {Autocomplete, Box, TextField} from "@mui/material";


export default function CurrencySelector({currencies, name, onSelect}: {
    currencies: Currency[],
    name: string,
    onSelect: (code: string) => void
}) {

    function handleChange(_: any, selectedValue: Currency) {
        onSelect(selectedValue.code);
    }

    return (
        <div>
            <Autocomplete
                id="currency-select"
                sx={{width: 300}}
                options={currencies}
                autoHighlight
                disableClearable
                onChange={handleChange}
                getOptionLabel={(option) => `${option.name} (${option.code})`}
                renderOption={(props, option) => {
                    const {key, ...optionProps} = props;
                    return (
                        <Box
                            key={key}
                            component="li"
                            sx={{'& > img': {mr: 2, flexShrink: 0}}}
                            {...optionProps}
                        >
                            {option.name} ({option.code})
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={name}
                        slotProps={{
                            htmlInput: {
                                ...params.inputProps,
                            },
                        }}
                    />
                )}
            />
        </div>
    )
}