import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import NoteInput from "./NoteInput";
import TagsInput from "./TagsInput";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(5, 0, 3, 0),
  },
}));

export default function NoteForm(props) {
  const classes = useStyles();
  const [noteInputValue, setNoteInputValue] = useState("");
  const [tagsInputValue, setTagsInputValue] = useState([]);
  const noteInputRef = useRef(null);
  const { tags, addNote, addTag } = props;

  const handleChangeNote = (e) => {
    setNoteInputValue(e.target.value);
  };

  const handleChangeTags = (e, allTags) => {
    const otherTags = allTags.slice(0, -1);
    let newTag = allTags.slice(-1)[0];
    // add new tag if it doesn't already exist
    if (newTag && newTag.inputValue) {
      newTag = addTag(newTag.inputValue);
      allTags = [...otherTags, newTag];
    }
    setTagsInputValue(allTags);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const tagIds = tagsInputValue.map((t) => t.id);
    addNote(noteInputValue, tagIds);
    setNoteInputValue("");
    setTagsInputValue([]);
    noteInputRef.current.focus();
  };

  return (
    <form className={classes.form} onSubmit={handleSave}>
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
        endIcon={<ArrowForwardIcon />}
      >
        Save note
      </Button>
    </form>
  );
}
