import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import NoteInput from "./NoteInput";
import TagsInput from "./TagsInput";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

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
  tag: {
    margin: theme.spacing(0, 0, 0, 0.5),
  },
}));

export default function App() {
  const classes = useStyles();
  const dummyNotes = [
    {
      id: uuidv4(),
      timestamp: moment().subtract(25, "minutes"),
      text: "Get groceries",
      tags: ["todo"],
    },
    {
      id: uuidv4(),
      timestamp: moment().subtract(10, "minutes"),
      text: "Go to the gym later",
      tags: ["todo", "fitness", "2020 goals"],
    },
    {
      id: uuidv4(),
      timestamp: moment().subtract(4, "minutes"),
      text: "Mitch is the trainer from Colorado",
      tags: ["people"],
    },
    {
      id: uuidv4(),
      timestamp: moment(),
      text: "Quarterly reviews are next week",
      tags: ["work", "reminder"],
    },
  ];
  const dummyTags = [
    "todo",
    "fitness",
    "2020 goals",
    "people",
    "work",
    "reminder",
  ];
  const [notes, setNotes] = useState(dummyNotes);
  const [tags, setTags] = useState(dummyTags);
  // const [notes, setNotes] = useState([]);
  // const [tags, setTags] = useState([]);
  const [noteInputValue, setNoteInputValue] = useState("");
  const [tagsInputValue, setTagsInputValue] = useState([]);

  const addNote = (text, tags) => {
    setNotes([{ id: uuidv4(), timestamp: moment(), text, tags }, ...notes]);
  };

  const addTag = (newTag) => {
    setTags([newTag, ...tags]);
  };

  const handleRemoveTag = (id, tag) => {
    const otherNotes = notes.filter((n) => n.id !== id);
    const selectedNote = notes.filter((n) => n.id === id)[0];
    const newTags = selectedNote.tags.filter((t) => t !== tag);
    setNotes([...otherNotes, { ...selectedNote, tags: newTags }]);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    addNote(noteInputValue, tagsInputValue);
    setNoteInputValue("");
    setTagsInputValue([]);
  };

  const handleChangeNote = (e) => {
    setNoteInputValue(e.target.value);
  };

  const handleChangeTags = (e, allTags) => {
    const newTag = allTags[allTags.length - 1];
    // add new tag if it doesn't already exist
    if (!tags.includes(newTag)) addTag(newTag);
    setTagsInputValue(allTags);
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
        <NoteInput value={noteInputValue} onChange={handleChangeNote} />
        <TagsInput
          value={tagsInputValue}
          onChange={handleChangeTags}
          options={tags}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!noteInputValue}
        >
          Save
        </Button>
      </form>
      <List>
        {notes
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((n) => (
            <ListItem key={n.id} disableGutters divider>
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
                  onDelete={() => handleRemoveTag(n.id, t)}
                />
              ))}
            </ListItem>
          ))}
      </List>
    </Container>
  );
}
