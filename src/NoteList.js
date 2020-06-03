import React from "react";
import List from "@material-ui/core/List";
import ListedNote from "./ListedNote";

export default function NoteList(props) {
  const { notes, tags, onRemoveTag } = props;

  return (
    <List>
      {notes
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((note) => (
          <ListedNote
            key={note.id}
            note={note}
            tags={tags}
            onRemoveTag={onRemoveTag}
          />
        ))}
    </List>
  );
}
