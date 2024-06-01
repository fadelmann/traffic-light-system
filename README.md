# Traffic Light Simulation

This project simulates a traffic light system with main street, side street, and pedestrian traffic lights. The traffic light phases are managed using React context and hooks. A user can click on a button to get a green phase for pedestrians to cross the main street.

## Installation

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Start the application:
   ```sh
   pnpm run dev
   ```

## Usage

The application will start a local server, and you can view the traffic light simulation in a browser.

## Rationale

###Bundler

Vite was chosen as the build tool for this project because it offers a faster and more efficient development experience compared to traditional bundlers like Webpack. Also it wasn't necessary to pick a meta framework like Next.js, because there is not much Routing or Data Fetching involved in this application.

###State Management

The useReducer hook was chosen to manage the traffic light phases because it provides a more predictable and scalable way to handle complex state transitions compared to useState. With useReducer, state logic can be centralized in a reducer function, making it easier to manage, and debug. This approach also makes the state transitions more explicit and easier to follow, which is beneficial for reviewing the code extending the traffic light logic.

The solution uses React context and hooks to manage state and synchronize traffic light phases. This approach was chosen for its simplicity and direct integration with React's component lifecycle. Using a state machine or third-party library for state management like X State was deemed unnecessary for this project due to its straightforward requirements. React's built-in hooks and context provide sufficient functionality to achieve the desired behavior with minimal complexity.

## Improvements

1. **Tests:** Implement unit or E2E tests for components and hooks to ensure correctness.
2. **Accessibility:** Improve accessibility by adding ARIA roles and properties.
3. **State Management Tool:** A state management tool like X State would allow for a more scalable approach.
