## Traffic Light Simulation Project

This project simulates a traffic light system with main street, side street, and pedestrian traffic lights. The traffic light phases are managed using React context and hooks. A user can click a button to initiate a green phase for pedestrians to cross the main street.

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

### Bundler

Vite was chosen as the build tool for this project because it offers a faster and more efficient development experience compared to traditional bundlers like Webpack. Additionally, a meta framework like Next.js wasn't required as there isn't much routing or data fetching involved in this application.

### State Management

The `useReducer` hook was chosen to manage the traffic light phases because it provides a more predictable, maintainable, and scalable way to handle complex state transitions compared to `useState`. With `useReducer`, state logic can be centralized in a reducer function, making it easier to manage and debug. This approach also makes the state transitions more explicit and easier to follow, which is beneficial for reviewing code or extending the traffic light logic.

The solution uses React context and custom hooks to manage state and synchronize traffic light phases. This approach was chosen for its simplicity and direct integration with React's component lifecycle.

Using a state machine or third-party library like X State was deemed unnecessary for this project due to its straightforward requirements. React's built-in hooks and context provide sufficient functionality to achieve the desired behavior with minimal complexity. However, if you'd want to add more streets or traffic lights, you would probably want to consider using something like X State or Redux with observables for a more robust state management solution.

## Potential Enhancements

1. **Tests:** Implement unit or E2E tests for components and hooks to ensure correctness.
2. **Accessibility:** Improve accessibility by adding ARIA roles and properties to make the simulation usable by everyone.
3. **State Management Tool:** As the project grows in complexity, consider using a state management tool like X State for a more scalable approach.
