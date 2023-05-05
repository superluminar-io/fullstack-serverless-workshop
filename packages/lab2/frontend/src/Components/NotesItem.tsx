import { Note } from "../types";

interface NotesItemProps {
  note: Note;
}

export const NotesItem: React.FunctionComponent<NotesItemProps> = ({
  note,
}) => {
  return (
    <div className="notes-item">
      <h4 className="note-header">{note.title}</h4>
      <p className="note-content">{note.content}</p>
      <div>
        <button className="note-delete-button">🗑️</button>
      </div>
    </div>
  );
};
