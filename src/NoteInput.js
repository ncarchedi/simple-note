import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
}));

export default function NoteInput(props) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.input}
      value={props.value}
      onChange={props.onChange}
      fullWidth
      placeholder="Write your note..."
    />
  );
}
