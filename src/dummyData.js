import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export const dummyNotes = [
  {
    id: uuidv4(),
    timestamp: moment().subtract(25, "minutes"),
    text: "Get groceries",
    tagIds: [1],
  },
  {
    id: uuidv4(),
    timestamp: moment().subtract(10, "minutes"),
    text: "Go to the gym later",
    tagIds: [1, 2, 3],
  },
  {
    id: uuidv4(),
    timestamp: moment().subtract(4, "minutes"),
    text: "Mitch is the trainer from Colorado",
    tagIds: [4],
  },
  {
    id: uuidv4(),
    timestamp: moment().subtract(3, "minutes"),
    text:
      "Ideas for next project: an edible rocket, a website that doesn't load, a note-taking app for babies",
    tagIds: [3, 7, 6, 5, 8],
  },
  {
    id: uuidv4(),
    timestamp: moment().subtract(1, "minutes"),
    text: "Water bottle",
    tagIds: [],
  },
  {
    id: uuidv4(),
    timestamp: moment(),
    text: "Quarterly reviews are next week",
    tagIds: [5, 6],
  },
];

export const dummyTags = [
  { id: 1, label: "todo" },
  { id: 2, label: "fitness" },
  { id: 3, label: "2020 goals" },
  { id: 4, label: "people" },
  { id: 5, label: "work" },
  { id: 6, label: "reminder" },
  { id: 7, label: "note to self" },
  { id: 8, label: "ideas" },
];
