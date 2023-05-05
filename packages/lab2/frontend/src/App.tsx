import "./App.css";
import { useEffect, useState } from "react";
import { listNotes } from "./services/notes";
import { Note } from "./types";

import { Navbar } from "./Components/Navbar";
import { AddNotesForm } from "./Components/AddNotesForm";
import { Divider } from "./Components/Divider";
import { NotesList } from "./Components/NotesList";
import { Footer } from "./Components/Footer";


const App: React.FunctionComponent = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchData = async () => {
    const currentNotes = await listNotes();
    setNotes(currentNotes);
  };

  useEffect(() => {
    fetchData();
  }, [notes]);

  return (
    <>
      <Navbar />
      <AddNotesForm />
      <Divider />
      <NotesList notes={notes} />
      <Footer />
    </>
  );
};

export default App;
