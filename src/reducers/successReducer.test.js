import { actionTypes } from "../actions";
import successReducer from "./successReducer";

test("returns default initial state of FALSE when no action is passed", () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});
test("returns state of true upon recieving an action CORRECT GUESS", () => {
  const newState = successReducer(undefined, {
    type: actionTypes.CORRECT_GUESS
  });
  expect(newState).toBe(true);
});
