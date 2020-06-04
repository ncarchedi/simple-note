import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
}));

const NoteInput = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { value, onChange } = props;

  return (
    <TextField
      inputRef={ref}
      className={classes.input}
      value={value}
      onChange={onChange}
      fullWidth
      autoFocus
      placeholder="Write your note..."
    />
  );
});

export default NoteInput;
