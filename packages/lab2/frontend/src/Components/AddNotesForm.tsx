import React, { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { createNote } from "../services/notes";
import { Note } from "../types";

export const AddNotesForm: React.FunctionComponent = () => {
  const [state, setState] = useState<Note>({
    title: "",
    content: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
    const data = { content: state.content, title: state.title };
    await createNote(data);
    setState({ title: "", content: "" });
  };

  return (
    <>
      <h2>New Note</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          required
          value={state.title}
          onChange={(e) => handleChange(e)}
        />

        <textarea
          name="content"
          placeholder="Content"
          required
          rows={3}
          maxLength={90}
          value={state.content}
          onChange={(e) => handleChange(e)}
        />

        <button>Add note</button>
      </form>
    </>
  );
};
