import React from "react";
import { mount } from "enzyme";

import { storeFactory, findByTestAttr } from "../tests/testUnits";
import App, { UnconnectedApp } from "./App";

import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();

// const setup = (state = {}) => {
//   const store = storeFactory(state);
//   const wrapper = shallow(<App store={store} />)
//     .dive()
//     .dive();
//   return wrapper;
// };

const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  return mount(<App />);
};

test("App renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});

describe("getSecretWord calls", () => {
  test("getSecretword gets called on App mount", () => {
    setup();

    // check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  test("secretWord does not update on App update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.update();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

// test("getSecretWord runs on App mount", () => {
//   const getSecretWordMock = jest.fn();

//   // set up app component with getSecretwordMock as a getSecretWord prop
//   const wrapper = shallow(
//     <UnconnectedApp
//       getSecretWord={getSecretWordMock}
//       success={false}
//       guessedWords={[]}
//     />
//   );

//   // run lifecycle method
//   wrapper.instance().componentDidMount();

//   // check to see if mock ran
//   const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

//   expect(getSecretWordCallCount).toBe(1);
// });
