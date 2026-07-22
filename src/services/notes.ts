import fs from "fs";
import path from "path";

const NOTES_FILE = path.join(process.cwd(), "data", "notes.json");

type NotesData = {
  [userId: string]: {
    [noteName: string]: string;
  };
};

function loadNotes(): NotesData {
  if (!fs.existsSync(NOTES_FILE)) {
    return {};
  }

  const data = fs.readFileSync(NOTES_FILE, "utf-8");
  return data ? JSON.parse(data) : {};
}

function saveNotes(data: NotesData) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(data, null, 2));
}

export function addNote(userId: string, name: string, content: string) {
  const notes = loadNotes();

  if (!notes[userId]) {
    notes[userId] = {};
  }

  notes[userId][name] = content;
  saveNotes(notes);
}

export function getNote(userId: string, name: string) {
  const notes = loadNotes();
  return notes[userId]?.[name];
}

export function listNotes(userId: string) {
  const notes = loadNotes();
  return Object.keys(notes[userId] || {});
}

export function deleteNote(userId: string, name: string) {
  const notes = loadNotes();

  if (notes[userId] && notes[userId][name]) {
    delete notes[userId][name];
    saveNotes(notes);
    return true;
  }

  return false;
}
