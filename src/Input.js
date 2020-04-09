import React from "react";
import { connect } from "react-redux";

import { guessWord } from "./actions";

class Input extends React.PureComponent {
  render() {
    const contents = this.props.success ? null : (
      <form className="form-inline">
        <input
          data-test="input-box"
          type="text"
          className="mb-2 mx-sm-3"
          placeholder="enter guess"
        ></input>
        <button
          data-test="submit-button"
          type="submit"
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </form>
    );
    return <div data-test="component-input">{contents}</div>;
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(mapStateToProps, { guessWord })(Input);
