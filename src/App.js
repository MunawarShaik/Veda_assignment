import "./App.css";
import React, { useState, useEffect } from "react";
import AddInput from "./Components/AddInput";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);

  /// getting saved todos from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  // handling delete
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  ///  handling Move
  const handleMove = (dir, idx) => {
    const items = [...todos];
    console.log(dir, idx);
    //console.log("handle move", items);
    if (dir === "up") {
      // Swap the currentSelection value with the previous one.
      let a = items[idx];
      // console.log(a);
      items[idx] = items[idx - 1];
      items[idx - 1] = a;
    } else if (dir === "down") {
      // Swap the currentSelection value with the next one.
      let a = items[idx];
      items[idx] = items[idx + 1];
      items[idx + 1] = a;
    }
    setTodos(items);
  };

  return (
    <div className="main">
      <h1 className="heading">Add Your Data</h1>
      <>
        {todos.map((todo, idx) => (
          <li className="newInputItem" key={idx}>
            <p className="text" type="text">
              {todo.title}
            </p>
            <div className="buttonsContainer">
              <button
                className={idx === 0 ? "notActive" : "button"}
                disabled={idx === 0}
                onClick={(e) => {
                  e.preventDefault();
                  handleMove("up", idx);
                  console.log("up clicked");
                }}
              >
                {" "}
                <AiFillCaretUp size="20" />{" "}
              </button>
              <button
                className={idx === todos.length - 1 ? "notActive" : "button"}
                disabled={idx === todos.length - 1}
                onClick={(e) => {
                  e.preventDefault();
                  handleMove("down", idx);
                  console.log("down clicked");
                }}
              >
                {" "}
                <AiFillCaretDown size="20" />{" "}
              </button>

              <button className="button" onClick={() => handleDelete(todo.id)}>
                {" "}
                <AiOutlineClose size="20" color="red" />{" "}
              </button>
            </div>
          </li>
        ))}
      </>
      <div>
        <AddInput />
      </div>
    </div>
  );
}
export default App;
