import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps, toreFactory } from "../tests/testUnits";
import Input, { UnconnectedInput } from "./Input";

// const setup = (initialState = {}) => {
//   const store = storeFactory(initialState);
//   const wrapper = shallow(<Input store={store} />)
//     .dive()
//     .dive();
//   return wrapper;
// };

const setup = (secretWord = "party") => {
  return shallow(<Input secretWord={secretWord} />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("does not throw warning with expected props", () =>
  checkProps(Input, { secretWord: "party" }));

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
  test("sfield is cleared upon submit button is clicked", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

// describe("render", () => {
//   describe("word has not been guessed", () => {
//     let wrapper;
//     beforeEach(() => {
//       const initialState = { success: false };
//       wrapper = setup(initialState);
//     });
//     test("renders component without error", () => {
//       const component = findByTestAttr(wrapper, "component-input");
//       expect(component.length).toBe(1);
//     });
//     test("renders input box", () => {
//       const inputBox = findByTestAttr(wrapper, "input-box");
//       expect(inputBox.length).toBe(1);
//     });
//     test("renders submit button", () => {
//       const submitButton = findByTestAttr(wrapper, "submit-button");
//       expect(submitButton.length).toBe(1);
//     });
//   });
//   describe("word has been guessed", () => {
//     let wrapper;
//     beforeEach(() => {
//       const initialState = { success: true };
//       wrapper = setup(initialState);
//     });
//     test("renders component without error", () => {
//       const component = findByTestAttr(wrapper, "component-input");
//       expect(component.length).toBe(1);
//     });
//     test("does not render input box", () => {
//       const inputBox = findByTestAttr(wrapper, "input-box");
//       expect(inputBox.length).toBe(0);
//     });
//     test("does not render submit button", () => {
//       const submitButton = findByTestAttr(wrapper, "submit-button");
//       expect(submitButton.length).toBe(0);
//     });
//   });
// });

// describe("guessWord action creator call", () => {
//   let guessWordMock;
//   let wrapper;
//   const guessedWord = "train";
//   beforeEach(() => {
//     guessWordMock = jest.fn();

//     // set up app component with guessWordMock as a getSecretWord prop
//     wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} />);

//     // add value to input box
//     wrapper.setState({ currentGuess: guessedWord });

//     // simulate clicked
//     const submitButton = findByTestAttr(wrapper, "submit-button");
//     submitButton.simulate("click", { preventDefault() {} });
//   });

//   test("calls guessWord once", () => {
//     // check to see if mock ran
//     const guessWordCallCount = guessWordMock.mock.calls.length;

//     expect(guessWordCallCount).toBe(1);
//   });
//   test("calls guessWord with input value as argument", () => {
//     const guessWordArg = guessWordMock.mock.calls[0][0];
//     expect(guessWordArg).toBe(guessedWord);
//   });

//   test("input box clears on submit", () => {
//     expect(wrapper.state("currentGuess")).toBe("");
//   });
// });
