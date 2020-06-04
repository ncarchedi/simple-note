import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  container: {
    "& :hover": {
      cursor: "pointer",
    },
  },
  tag: {
    margin: theme.spacing(0.25),
  },
  tagsContainer: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "right",
    },
  },
  overlay: {
    display: "flex",
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1,
    opacity: 0.8,
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}));

export default function ListedNote(props) {
  const classes = useStyles();
  const { note, tags, onDeleteNote, onRemoveTag } = props;
  const [isHovered, setIsHovered] = useState(false);

  const renderOverlay = () => {
    return (
      <Box
        className={classes.overlay}
        justifyContent="center"
        alignItems="center"
      >
        <IconButton
          classes={classes.hoverButton}
          aria-label="edit"
          onClick={() => console.log("edit note: " + note.text)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          classes={classes.hoverButton}
          aria-label="delete"
          onClick={() => onDeleteNote(note.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <ListItem
      key={note.id}
      className={classes.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && renderOverlay()}
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
