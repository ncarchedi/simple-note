import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(3),
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
      options={props.options}
      renderInput={(params) => (
        <TextField {...params} placeholder="Add some tags..." />
      )}
    />
  );
}
