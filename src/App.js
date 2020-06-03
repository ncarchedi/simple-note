import React, { useState, useEffect, useRef } from "react";
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
// import { dummyNotes, dummyTags } from "./dummyData";

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

  // get data from local storage, if it exists --------------
  const storedNotes = () => {
    const x = JSON.parse(window.localStorage.getItem("notes"));
    if (x)
      return x.map((n) => ({
        ...n,
        timestamp: moment(n.timestamp),
      }));
    return [];
  };
  const storedTags = () => {
    const x = JSON.parse(window.localStorage.getItem("tags"));
    return x || [];
  };
  // --------------------------------------------------------

  const [notes, setNotes] = useState(storedNotes);
  const [tags, setTags] = useState(storedTags);

  const [noteInputValue, setNoteInputValue] = useState("");
  const [tagsInputValue, setTagsInputValue] = useState([]);
  const noteInputRef = useRef(null);

  // update local storage when notes or tags change
  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
    window.localStorage.setItem("tags", JSON.stringify(tags));
  }, [notes, tags]);

  const addNote = (text, tagIds) => {
    setNotes([{ id: uuidv4(), timestamp: moment(), text, tagIds }, ...notes]);
  };

  const createTag = (label) => {
    const newTag = { id: uuidv4(), label };
    setTags([newTag, ...tags]);
    return newTag;
  };

  const handleRemoveTag = (noteId, tagId) => {
    const otherNotes = notes.filter((n) => n.id !== noteId);
    const selectedNote = notes.filter((n) => n.id === noteId)[0];
    const newTagIds = selectedNote.tagIds.filter((id) => id !== tagId);
    setNotes([...otherNotes, { ...selectedNote, tagIds: newTagIds }]);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    const tagIds = tagsInputValue.map((t) => t.id);
    addNote(noteInputValue, tagIds);
    setNoteInputValue("");
    setTagsInputValue([]);
    noteInputRef.current.focus();
  };

  const handleChangeNote = (e) => {
    setNoteInputValue(e.target.value);
  };

  const handleChangeTags = (e, allTags) => {
    const otherTags = allTags.slice(0, -1);
    let newTag = allTags.slice(-1)[0];
    // add new tag if it doesn't already exist
    if (newTag && newTag.inputValue) {
      newTag = createTag(newTag.inputValue);
      allTags = [...otherTags, newTag];
    }
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
          .map((note) => (
            <ListItem key={note.id} disableGutters divider>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={6}>
                  <ListItemText
                    primary={note.text}
                    secondary={note.timestamp.format("LLL")}
                  />
                </Grid>
                <Grid className={classes.tagsContainer} item xs={12} sm={6}>
                  {note.tagIds.length ? (
                    note.tagIds.map((tagId) => (
                      <Chip
                        className={classes.tag}
                        key={tagId}
                        label={tags
                          .filter((t) => t.id === tagId)
                          .map((t) => t.label)}
                        variant="outlined"
                        color="primary"
                        size="small"
                        onDelete={() => handleRemoveTag(note.id, tagId)}
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
