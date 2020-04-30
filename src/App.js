import React from "react";
import { connect } from "react-redux";
import "./App.css";
import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
import Input from "./Input";
import { getSecretWord } from "./actions/index";
import hookActions from "./actions/hookActions";

function reducer(state, action) {
  switch (action.type) {
    case "setsecretword":
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });
  const setSecretWord = secretWord =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);
  return (
    <div data-test="component-app">
      <Input />
    </div>
  );
}

export default App;
