import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
}));

const filter = createFilterOptions();

export default function TagsInput(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState(""); // what's currently typed
  const { value, onChange, options } = props;

  return (
    <Autocomplete
      className={classes.input}
      value={value}
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue.toLowerCase());
      }}
      multiple
      autoHighlight
      filterSelectedOptions
      freeSolo
      clearOnBlur
      openOnFocus
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        // Suggest the creation of a new value per...
        // https://material-ui.com/components/autocomplete/#creatable
        if (params.inputValue && !filtered.length) {
          filtered.push({
            inputValue: params.inputValue,
            label: `Add "${params.inputValue}"`,
          });
        }
        return filtered;
      }}
      options={options.sort((a, b) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      })}
      getOptionLabel={(option) => option.label}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.label, inputValue);
        const parts = parse(option.label, matches);
        return (
          <div>
            {parts.map((part, index) => (
              <span
                key={index}
                style={{ fontWeight: part.highlight ? 700 : 400 }}
              >
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
      ChipProps={{ variant: "outlined", color: "primary", size: "small" }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={value.length ? null : "Add some tags..."}
        />
      )}
    />
  );
}
