import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddInput = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
      });
      setTitle("");
    }
  };
  return (
    <div className="formContainer">
      <form className="formInputDiv" onSubmit={handleSubmit}>
        <input
          className="addInputEl"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="addButton">Add</button>
      </form>
    </div>
  );
};

export default AddInput;
