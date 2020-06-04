import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
// import { dummyNotes, dummyTags } from "./dummyData";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, "auto"),
  },
  logo: {
    fontFamily: ["Pacifico", "cursive"],
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

  // update local storage whenever notes or tags change
  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
    window.localStorage.setItem("tags", JSON.stringify(tags));
  }, [notes, tags]);

  // add a new note to the list of all notes
  const addNote = (text, tagIds) => {
    const newNote = { id: uuidv4(), timestamp: moment(), text, tagIds };
    setNotes([newNote, ...notes]);
  };

  // delete notes from the list of all notes
  const deleteNotes = (ids) => {
    setNotes(notes.filter((n) => !ids.includes(n.id)));
  };

  // add tag to the list of tag options
  const addTag = (label) => {
    const newTag = { id: uuidv4(), label };
    setTags([newTag, ...tags]);
    return newTag;
  };

  // remove tag from an existing note
  const handleRemoveTag = (noteId, tagId) => {
    const otherNotes = notes.filter((n) => n.id !== noteId);
    const selectedNote = notes.filter((n) => n.id === noteId)[0];
    const newTagIds = selectedNote.tagIds.filter((id) => id !== tagId);
    setNotes([...otherNotes, { ...selectedNote, tagIds: newTagIds }]);
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
      <NoteForm tags={tags} addNote={addNote} addTag={addTag} />
      <NotesList
        notes={notes}
        tags={tags}
        deleteNotes={deleteNotes}
        onRemoveTag={handleRemoveTag}
      />
    </Container>
  );
}
