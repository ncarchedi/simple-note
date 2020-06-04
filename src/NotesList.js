import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
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
    "& button": {
      margin: theme.spacing(0, 0.5),
    },
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

  const handleEditNote = () => {
    alert("Sorry, you can't do that yet!");
  };

  const renderNotesList = () => {
    const numberSelected = selectedNoteIds.length;

    return (
      <>
        <Box className={classes.buttonContainer}>
          <Tooltip title={"Select one or more notes to delete them."}>
            <span>
              <Button
                onClick={handleDeleteNotes}
                variant="outlined"
                disabled={!numberSelected}
                endIcon={<DeleteIcon />}
                color="default"
              >
                {numberSelected === 1
                  ? `Delete ${numberSelected} note`
                  : `Delete ${numberSelected} notes`}
              </Button>
            </span>
          </Tooltip>
          <Tooltip title={"Select exactly one note to delete it."}>
            <span>
              <Button
                onClick={handleEditNote}
                variant="contained"
                disabled={numberSelected !== 1}
                endIcon={<DeleteIcon />}
                color="primary"
              >
                Edit note
              </Button>
            </span>
          </Tooltip>
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
        Add some notes!
      </Typography>
    );
  };

  return notes.length ? renderNotesList() : renderEmptyScreen();
}
