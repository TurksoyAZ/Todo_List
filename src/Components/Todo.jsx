import { useState } from "react";
import "./Todo.css";

function Todo({ todo, data, setData }) {
    const [toggle, setToogle] = useState(false);
    const [editInput, setEditInput] = useState("");

    //delet ADDED
    const deletAdded = () => {
        setData(data.filter((e) => e.id !== todo.id));
    };

    // selected
    const selectedAdd = () => {
        setData(
            data.map((item) => {
                if (item.id === todo.id) {
                    return { ...item, completed: !item.completed };
                } else {
                    return item;
                }
            })
        );
    };

    //remove
    const getToggle = () => {
        setToogle(!toggle);
    };

    const submited = (e) => {
        e.preventDefault();

        setToogle(!toggle);

        setData(
            data.map((item) => {
                if (item.id === todo.id) {
                    return { ...item, text: editInput };
                }
                return item;
            })
        );
    };

    return (
        <>
            <div className="divItems">
                <li className={todo.completed ? "selectedListe" : ""}>{todo.text}</li>
                <div>
                    <button
                        className={todo.completed ? "" : "btnFirst"}
                        onClick={selectedAdd}
                    >
                        V
                    </button>
                    <button className="btnSecond" onClick={deletAdded}>
                        X
                    </button>
                    <button onClick={getToggle}>Edit</button>
                </div>
            </div>


            {toggle ? (
                <form onSubmit={submited} className="form2">
                    <input
                        type="text"
                        placeholder={todo.text}
                        onChange={(e) => setEditInput(e.target.value)}
                    />
                    <button type="submit">V</button>
                </form>
            ) : null}
        </>
    );
}

export default Todo;
