import React from "react";
import PropTypes from "prop-types";

function Input({ secretWord }) {
  const [currentGuess, setCurrentGuess] = React.useState("");
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="test"
          placeholder="enter guess"
          value={currentGuess}
          onChange={evt => setCurrentGuess(evt.target.value)}
        />
        <button
          data-test="submit-button"
          onClick={evt => {
            evt.preventDefault();
            setCurrentGuess("");
          }}
          className="btn btn-primary mb-2"
          type="submit"
        />
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;
