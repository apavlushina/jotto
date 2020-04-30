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

const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord }, jest.fn()]);

  React.useReducer = mockUseReducer;

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
describe("secretWord is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });

  test("renders app when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(true);
  });

  test("does not render spinner when secretWord is not null", () => {
    const spinnerComponent = findByTestAttr(wrapper, " spinner");
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  test("does not render app when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(false);
  });

  test("renders spinner when secretWord is null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(true);
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
