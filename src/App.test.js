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
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
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
