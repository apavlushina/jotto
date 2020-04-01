import { correctGuess, actionTypes } from "./index";
import { exportAllDeclaration } from "babel-types";

describe("correctGuess", () => {
  test("returns an action with type CORRECT_GUESS", () => {
    const action = correctGuess();
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
  });
});
