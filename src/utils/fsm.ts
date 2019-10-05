// function bouncer() {
//   const State = Object.freeze({
//     ONE: "one",
//     DELAY: "delay",
//     TWO: "two"
//   });

//   return {
//     initialState: State.ONE,
//     states: {
//       [State.ONE]: function one(next, counter = 0) {
//         if (counter < 4) {
//           next(State.ONE, (counter += 1));
//         } else {
//           next(State.DELAY, State.TWO);
//         }
//       },

//       [State.DELAY]: async function delay(next, state) {
//         return await setTimeout(() => next(state), 2000);
//       },

//       [State.TWO]: function two(next, counter = 0) {
//         if (counter < 4) {
//           next(State.TWO, (counter += 1));
//         } else {
//           next(State.DELAY, State.ONE);
//         }
//       }
//     }
//   };
// }

export function StateMachine({ initialState, states }): void {
  let currentState = initialState;

  async function next(nextState, ...rest): Promise<void> {
    if (typeof nextState !== "undefined") {
      currentState = nextState;
      console.log(`state changed to ${currentState}...`);

      await states[currentState](next, ...rest);
    }
  }

  next(currentState);
}
