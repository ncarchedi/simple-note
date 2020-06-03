import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
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
import { dummyNotes, dummyTags } from "./dummyData";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, "auto"),
  },
  logo: {
    fontFamily: ["Pacifico", "cursive"],
  },
  form: {
    margin: theme.spacing(5, 0, 3, 0),
  },
  tag: {
    margin: theme.spacing(0.25),
  },
  tagsContainer: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "right",
    },
  },
}));

export default function App() {
  const classes = useStyles();

  const [notes, setNotes] = useState(dummyNotes);
  const [tags, setTags] = useState(dummyTags);
  // const [notes, setNotes] = useState([]);
  // const [tags, setTags] = useState([]);

  const [noteInputValue, setNoteInputValue] = useState("");
  const [tagsInputValue, setTagsInputValue] = useState([]);
  const noteInputRef = useRef(null);

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
    noteInputRef.current.focus();
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
        <NoteInput
          ref={noteInputRef}
          value={noteInputValue}
          onChange={handleChangeNote}
        />
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
              <Grid container alignItems="center">
                <Grid item xs={12} sm={6}>
                  <ListItemText
                    primary={n.text}
                    secondary={n.timestamp.format("LLL")}
                  />
                </Grid>
                <Grid className={classes.tagsContainer} item xs={12} sm={6}>
                  {n.tags.length ? (
                    n.tags.map((t) => (
                      <Chip
                        className={classes.tag}
                        key={t}
                        label={t}
                        variant="outlined"
                        color="primary"
                        size="small"
                        onDelete={() => handleRemoveTag(n.id, t)}
                      />
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ fontStyle: "italic" }}
                    >
                      No tags
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </ListItem>
          ))}
      </List>
    </Container>
  );
}
