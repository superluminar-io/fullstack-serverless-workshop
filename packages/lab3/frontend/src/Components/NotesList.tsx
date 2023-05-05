import { Note } from "../types";
import { NotesItem } from "./NotesItem";

interface NotesListProps {
  notes: Note[];
}

export const NotesList: React.FunctionComponent<NotesListProps> = ({
  notes,
}) => {
  return (
    <>
      <h2>Your Notes</h2>
      <div className="notes-list">
        {notes.map((note: Note) => (
          <NotesItem note={note} key={note.id} />
        ))}
      </div>
    </>
  );
};
