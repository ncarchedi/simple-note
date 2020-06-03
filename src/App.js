import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  form: {
    margin: theme.spacing(3, 0),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

export default function App() {
  // const dummyData = [
  //   { timestamp: moment().add(25, "minutes"), text: "This is a test" },
  //   { timestamp: moment().add(10, "minutes"), text: "This is another test" },
  //   { timestamp: moment(), text: "This is one more test" },
  // ];
  // const [notes, setNotes] = useState(dummyData);

  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  const addNote = (newNote) => {
    setNotes([{ timestamp: moment(), text: newNote }, ...notes]);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    setInput("");
    addNote(input);
  };

  const handleChangeNote = (e) => {
    setInput(e.target.value);
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography variant="h5" component="h1" color="primary">
        Simple Note
      </Typography>
      <form className={classes.form} onSubmit={handleSaveNote}>
        <TextField
          className={classes.input}
          value={input}
          onChange={handleChangeNote}
          fullWidth
          placeholder="Write something here..."
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
      <List>
        {notes.map((n) => (
          <ListItem key={n.timestamp.format("LLL")} disableGutters>
            <ListItemText
              primary={n.text}
              secondary={n.timestamp.format("LLL")}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
