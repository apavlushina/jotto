import React from "react";
import { shallow } from "enzyme";

import { storeFactory, findByTestAttr } from "../tests/testUnits";
import App, { UnconnectedApp } from "./App";

// const setup = (state = {}) => {
//   const store = storeFactory(state);
//   const wrapper = shallow(<App store={store} />)
//     .dive()
//     .dive();
//   return wrapper;
// };

const setup = () => {
  return shallow(<App />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "compomemt-app");
  expect(component.length).toBe(1);
});

describe("redux properties", () => {
  test("has access to success state", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("has access to secretWord state", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test("has access to guessedWords state", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toBe(guessedWords);
  });
  test("getSecretWord action creator is a function on the props", () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test("getSecretWord runs on App mount", () => {
  const getSecretWordMock = jest.fn();

  // set up app component with getSecretwordMock as a getSecretWord prop
  const wrapper = shallow(
    <UnconnectedApp
      getSecretWord={getSecretWordMock}
      success={false}
      guessedWords={[]}
    />
  );

  // run lifecycle method
  wrapper.instance().componentDidMount();

  // check to see if mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);
});
