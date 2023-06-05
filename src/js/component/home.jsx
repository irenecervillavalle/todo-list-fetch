import React, { useEffect, useState } from "react";

//create your first component

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const validateInput = () => {
    if (inputValue === "") alert("No hay tareas, añadir tareas");
  };

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/ireneC")
      .then((res) => res.json())
      .then((data) => {
        if (
          data.msg ==
          "This use does not exists, first call the POST method first to create the list for this username"
        ) {
          fetch("https://assets.breatheco.de/apis/fake/todos/user/ireneC", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([]),
          });
        } else {
          console.log(data);
          setTodos(data);
        }
      });
  }, []);

  const addList = () => {
    const data = {
      label: inputValue,
      done: false,
    };

    const newArrayList = [...todos];
    newArrayList.push(data);

    fetch("https://assets.breatheco.de/apis/fake/todos/user/ireneC", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArrayList),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(newArrayList);
        setInputValue("");
      })
      .catch((err) => console.log(err));
  };

  const deleteList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/ireneC", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos([]);
        setInputValue("");
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1 className="h1">todos</h1>
      <ul>
        <li>
          <input
            className="input"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addList();
              }
            }}
            placeholder="What´s needs to be done?"
          ></input>
          <button onClick={deleteList}>Delete</button>
        </li>
        {todos?.map((item, index) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>
      <div className="items">{todos.length} items left</div>
    </div>
  );
};

export default Home;
