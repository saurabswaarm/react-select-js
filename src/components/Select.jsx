import { useState } from "react";
import Select from "react-select";
import Option from "./components/Option";
import "./App.css";

export const colourOptions = [
  { value: "ocean1", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Select
        defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        name="colors"
        options={colourOptions}
        components={{ Option }}
        hideSelectedOptions={false}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
}

export default App;
6G