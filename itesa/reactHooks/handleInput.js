import { useState } from "react";

function handleInput() {
  const [value, setValue] = useState("");

  function onChange(event) {
    setValue(event.target.value);
  }

  return { value, onChange, setValue };
}

export default handleInput;
