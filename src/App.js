import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  logo: {
    fontFamily: ["Pacifico", "cursive"],
  },
  form: {
    margin: theme.spacing(5, 0, 3, 0),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  tag: {
    margin: theme.spacing(0, 0, 0, 0.5),
  },
}));

export default function App() {
  const classes = useStyles();

  const dummyData = [
    {
      timestamp: moment().add(25, "minutes"),
      text: "Get groceries",
      tags: ["todo"],
    },
    {
      timestamp: moment().add(10, "minutes"),
      text: "Go to the gym later",
      tags: ["todo", "fitness", "2020 goals"],
    },
    {
      timestamp: moment().add(4, "minutes"),
      text: "Mitch is the trainer from Colorado",
      tags: ["people"],
    },
    {
      timestamp: moment(),
      text: "Quarterly reviews are next week",
      tags: ["work", "reminder"],
    },
  ];
  const [notes, setNotes] = useState(dummyData);
  // const [notes, setNotes] = useState([]);
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
      <Typography
        className={classes.logo}
        variant="h4"
        component="h1"
        color="primary"
      >
        SimpleNote
      </Typography>
      <form className={classes.form} onSubmit={handleSaveNote}>
        <TextField
          className={classes.input}
          value={input}
          onChange={handleChangeNote}
          fullWidth
          placeholder="Write something here..."
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!input}
        >
          Save
        </Button>
      </form>
      <List>
        {notes.map((n) => (
          <ListItem key={n.timestamp.format("x")} disableGutters>
            <ListItemText
              primary={n.text}
              secondary={n.timestamp.format("LLL")}
            />
            {n.tags.map((t) => (
              <Chip
                className={classes.tag}
                key={t}
                label={t}
                variant="outlined"
                color="primary"
                size="small"
                onDelete={() => console.log(`deleted ${t} from ${n.text}`)}
              />
            ))}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
