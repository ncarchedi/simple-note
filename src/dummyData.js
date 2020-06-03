import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export const dummyNotes = [
  {
    id: uuidv4(),
    timestamp: moment().subtract(25, "minutes"),
    text: "Get groceries",
    tags: ["todo"],
  },
  {
    id: uuidv4(),
    timestamp: moment().subtract(10, "minutes"),
    text: "Go to the gym later",
    tags: ["todo", "fitness", "2020 goals"],
  },
  {
    id: uuidv4(),
    timestamp: moment().subtract(4, "minutes"),
    text: "Mitch is the trainer from Colorado",
    tags: ["people"],
  },
  {
    id: uuidv4(),
    timestamp: moment().subtract(3, "minutes"),
    text:
      "Ideas for next project: an edible rocket, a website that doesn't load, a note-taking app for babies",
    tags: ["2020 goals", "note to self", "reminder", "work", "ideas"],
  },
  {
    id: uuidv4(),
    timestamp: moment().subtract(1, "minutes"),
    text: "Water bottle",
    tags: [],
  },
  {
    id: uuidv4(),
    timestamp: moment(),
    text: "Quarterly reviews are next week",
    tags: ["work", "reminder"],
  },
];

export const dummyTags = [
  "todo",
  "fitness",
  "2020 goals",
  "people",
  "work",
  "reminder",
  "note to self",
  "ideas",
];
