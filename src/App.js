import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleClick = (value) => {
    if (isEvaluating) {
      setInput(value);
      setIsEvaluating(false);
    } else {
      setInput(input + value);
    }
  };

  const handleClear = () => {
    setInput("");
  };

  const handleEvaluate = () => {
    try {
      setInput(eval(input).toString());
      setIsEvaluating(true);
    } catch (e) {
      setInput("Error");
    }
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      if (key >= "0" && key <= "9") {
        handleClick(key);
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleClick(key);
      } else if (key === "Enter") {
        handleEvaluate();
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input, isEvaluating]);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <p>{input}</p>
        </div>
        <div className="buttons">
          <button onClick={handleClear} className="button clear">C</button>
          <button onClick={handleBackspace} className="button operator">←</button>
          <button onClick={() => handleClick("/")} className="button operator">/</button>
          <button onClick={() => handleClick("*")} className="button operator">*</button>

          <button onClick={() => handleClick("7")} className="button">7</button>
          <button onClick={() => handleClick("8")} className="button">8</button>
          <button onClick={() => handleClick("9")} className="button">9</button>
          <button onClick={() => handleClick("-")} className="button operator">-</button>

          <button onClick={() => handleClick("4")} className="button">4</button>
          <button onClick={() => handleClick("5")} className="button">5</button>
          <button onClick={() => handleClick("6")} className="button">6</button>
          <button onClick={() => handleClick("+")} className="button operator">+</button>

          <button onClick={() => handleClick("1")} className="button">1</button>
          <button onClick={() => handleClick("2")} className="button">2</button>
          <button onClick={() => handleClick("3")} className="button">3</button>
          <button onClick={() => handleClick("0")} className="button zero">0</button>

          <button onClick={() => handleClick(".")} className="button">.</button>
          <button onClick={handleEvaluate} className="button equals">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
