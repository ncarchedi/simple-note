import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
}));

export default function TagsInput(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState(""); // what's currently typed

  return (
    <Autocomplete
      className={classes.input}
      value={props.value}
      onChange={props.onChange}
      inputValue={inputValue}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue);
      }}
      multiple
      autoHighlight
      filterSelectedOptions
      freeSolo
      options={props.options.sort()}
      renderOption={(option, { inputValue }) => {
        const matches = match(option, inputValue);
        const parts = parse(option, matches);

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
          placeholder={props.value.length ? null : "Add some tags..."}
        />
      )}
    />
  );
}
