import { useState } from "react";
import { addItem } from "../features/todoSlice";
import { useAppDispatch } from "../store";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { format, isValid } from "date-fns";

const Header = () => {
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<Date>(new Date());
  const [isTimeTouched, setIsTimeTouched] = useState(false);

  const dispatch = useAppDispatch();

  const onAddItem = () => {
    if (!isValid(value)) {
      alert("Please pick valid date and time!!!");
      return;
    }

    let date = format(value as Date, "MM/dd/yyyy - h:mm a");

    if (!text) {
      alert("input field is required!!!");
      return;
    }

    if (!isTimeTouched) {
      dispatch(addItem({ text }));
    } else {
      dispatch(addItem({ text, date }));
    }

    setText("");
    setIsTimeTouched(false);
    setValue(new Date());
  };

  return (
    <div className="header">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          value={value}
          minDateTime={new Date()}
          onChange={(newValue) => {
            setValue(newValue as Date);
            setIsTimeTouched(true);
          }}
        />
      </LocalizationProvider>
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
