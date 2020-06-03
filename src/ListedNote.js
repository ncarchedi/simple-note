import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  tag: {
    margin: theme.spacing(0.25),
  },
  tagsContainer: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "right",
    },
  },
}));

export default function ListedNote(props) {
  const { note, tags, onRemoveTag } = props;
  const classes = useStyles();

  return (
    <ListItem key={note.id} divider onClick={() => console.log(note.id)}>
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
                label={tags.filter((t) => t.id === tagId).map((t) => t.label)}
                variant="outlined"
                color="primary"
                size="small"
                onDelete={() => onRemoveTag(note.id, tagId)}
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
  );
}
