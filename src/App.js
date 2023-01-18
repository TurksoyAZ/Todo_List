import { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
// import TodoListe from "./Components/TestTodoList/TodoListe";
import Todo from "./Components/Todo.jsx";

function App() {
  //Data
  const [data, setData] = useState([]);
  //input
  const [input, setInput] = useState("");

  //for Select
  const [inputSelect, setInputSelect] = useState("");
  const [filtered, setFiltered] = useState([]);

  const refItem = useRef();

  //
  useEffect(() => {
    const addFiltered = () => {
      switch (inputSelect) {
        case "selected":
          setFiltered(data.filter((e) => e.completed === true));
          break;
        case "unselected":
          setFiltered(data.filter((e) => e.completed === false));
          break;
        default:
          setFiltered(data);
          break;
      }
    };
    addFiltered();

    //
    refItem.current.focus();
  }, [inputSelect, data]);

  //onclick Add Function
  const getAdd = (e) => {
    e.preventDefault();

    if (input) {
      setData([
        ...data,
        {
          text: input,
          completed: false,
          id: uuid(),
        },
      ]);
      setInput("");
    } else {
      return alert("TYPE SOMETHING");
    }

    refItem.current.focus();
  };

  return (
    <section className="App">
      <article>
        <form className="form1">
          <input
            ref={refItem}
            type="text"
            placeholder="Type here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit" onClick={getAdd}>
            Add
          </button>

          <div>
            <select onChange={(e) => setInputSelect(e.target.value)}>
              <option value="all">All</option>
              <option value="selected">Selected</option>
              <option value="unselected">Unselected</option>
            </select>
          </div>
        </form>

        <div className="listDiv">
          <ul>
            {filtered.map((todo) => (
              <Todo key={todo.id} todo={todo} data={data} setData={setData} />
            ))}
          </ul>
        </div>
      </article>

      {/* <TodoListe /> */}
    </section>
  );
}

export default App;
