import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ListedNote from "./ListedNote";

const useStyles = makeStyles((theme) => ({
  emptyScreen: {
    marginTop: theme.spacing(5),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(1),
  },
}));

export default function NotesList(props) {
  const classes = useStyles();
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const { notes, tags, deleteNotes, onRemoveTag } = props;

  const handleSelectNote = (noteId) => {
    if (selectedNoteIds.includes(noteId))
      setSelectedNoteIds(selectedNoteIds.filter((id) => id !== noteId));
    else setSelectedNoteIds([...selectedNoteIds, noteId]);
  };

  const handleDeleteNotes = () => {
    deleteNotes(selectedNoteIds);
    setSelectedNoteIds([]);
  };

  const renderNotesList = () => {
    const numNotes = selectedNoteIds.length;

    return (
      <>
        <Box className={classes.buttonContainer}>
          <Button
            onClick={handleDeleteNotes}
            variant="contained"
            disabled={!numNotes}
            endIcon={<DeleteIcon />}
          >
            {numNotes === 1
              ? `Delete ${numNotes} note`
              : `Delete ${numNotes} notes`}
          </Button>
        </Box>
        <List>
          {notes
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((note) => (
              <ListedNote
                key={note.id}
                note={note}
                tags={tags}
                isSelected={selectedNoteIds.includes(note.id)}
                onSelect={handleSelectNote}
                onRemoveTag={onRemoveTag}
              />
            ))}
        </List>
      </>
    );
  };

  const renderEmptyScreen = () => {
    return (
      <Typography
        className={classes.emptyScreen}
        variant="h5"
        component="h2"
        align="center"
        color="textSecondary"
      >
        You don't have any notes
      </Typography>
    );
  };

  return notes.length ? renderNotesList() : renderEmptyScreen();
}
