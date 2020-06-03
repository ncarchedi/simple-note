import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NoteInput from "./NoteInput";
import TagsInput from "./TagsInput";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(5, 0, 3, 0),
  },
}));

export default function NoteForm(props) {
  const classes = useStyles();

  const {
    tags,
    noteInputValue,
    tagsInputValue,
    onChangeNote,
    onSaveNote,
    onChangeTags,
    noteInputRef,
  } = props;

  return (
    <form className={classes.form} onSubmit={onSaveNote}>
      <NoteInput
        ref={noteInputRef}
        value={noteInputValue}
        onChange={onChangeNote}
      />
      <TagsInput
        value={tagsInputValue}
        onChange={onChangeTags}
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
  );
}
