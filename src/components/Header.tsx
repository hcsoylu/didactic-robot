import { useState } from "react";
import { addItem } from "../features/todoSlice";
import { useAppDispatch } from "../store";

const Header = () => {
  const [text, setText] = useState<string>("");

  const dispatch = useAppDispatch();

  const onAddItem = () => {
    if (!text) {
      alert("input field is required!!!");
      return;
    }

    dispatch(addItem({ text }));

    setText("");
  };

  return (
    <div className="header">
      <input
        className="task"
        type="text"
        value={text}
        placeholder="Please enter task here"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="add-button" onClick={onAddItem}>
        Add
      </button>
    </div>
  );
};

export default Header;
